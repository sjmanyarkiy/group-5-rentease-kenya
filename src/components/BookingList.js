import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../pages/NavBar";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Fetch bookings and properties
  useEffect(() => {
    fetch("http://localhost:5000/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data));

    fetch("http://localhost:5000/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);

  // Get property name
  const getPropertyName = (id) => {
    const prop = properties.find((p) => String(p.id) === String(id));
    return prop ? prop.location : "Unknown";
  };

  // Approve booking
  const handleApprove = async (booking) => {
    const res = await fetch(`http://localhost:5000/bookings/${booking.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "approved" }),
    });
    if (res.ok) {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === booking.id ? { ...b, status: "approved" } : b
        )
      );
      alert(`${booking.tenantName} approved!`);
    }
  };

  // Reject booking
  const handleReject = async (booking) => {
    const res = await fetch(`http://localhost:5000/bookings/${booking.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "rejected" }),
    });
    if (res.ok) {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === booking.id ? { ...b, status: "rejected" } : b
        )
      );
      alert(`${booking.tenantName} rejected!`);
    }
  };

  // Filter bookings
  const filteredBookings = bookings.filter((b) =>
    selectedStatus === "all"
      ? true
      : b.status.toLowerCase() === selectedStatus.toLowerCase()
  );

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2>Bookings</h2>
          <Link to="/request-booking">
            <button style={{ padding: "10px 15px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
              New Booking Request
            </button>
          </Link>
        </div>

        {/* Status Filter Buttons */}
        <div style={{ marginBottom: "15px" }}>
          {["all", "pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              style={{
                marginRight: "10px",
                padding: "5px 10px",
                backgroundColor:
                  selectedStatus === status ? "#007bff" : "#e0e0e0",
                color: selectedStatus === status ? "white" : "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Bookings Table */}
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tenant</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Property</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: "8px", textAlign: "center" }}>
                  Loading properties...
                </td>
              </tr>
            ) : filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: "8px", textAlign: "center" }}>
                  No bookings found
                </td>
              </tr>
            ) : (
              filteredBookings.map((b, index) => (
                <tr
                  key={b.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white"
                  }}
                >
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {b.tenantName}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <Link
                      to={`/properties/${b.propertyId}`}
                      style={{ textDecoration: "none", color: "#007bff" }}
                    >
                      {getPropertyName(b.propertyId)}
                    </Link>
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      fontWeight: "bold",
                      color:
                        b.status === "approved"
                          ? "green"
                          : b.status === "rejected"
                          ? "red"
                          : "orange",
                    }}
                  >
                    {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <button
                      onClick={() => handleApprove(b)}
                      disabled={b.status !== "pending"}
                      style={{
                        marginRight: "10px",
                        padding: "5px 10px",
                        backgroundColor:
                          b.status === "approved" ? "green" : "#e0ffe0",
                        border: "1px solid green",
                        cursor: b.status === "pending" ? "pointer" : "not-allowed",
                      }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(b)}
                      disabled={b.status !== "pending"}
                      style={{
                        padding: "5px 10px",
                        backgroundColor:
                          b.status === "rejected" ? "red" : "#ffe0e0",
                        border: "1px solid red",
                        cursor: b.status === "pending" ? "pointer" : "not-allowed",
                      }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default BookingList;
