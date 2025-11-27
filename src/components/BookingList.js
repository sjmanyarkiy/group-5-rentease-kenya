// BookingList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState("all");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBookings();
    fetchProperties();
  }, []);

  // Fetch bookings from backend
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch properties from backend
  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/properties");
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Map propertyId to property name
  const getPropertyName = (id) => {
    const prop = properties.find((p) => Number(p.id) === Number(id));
    return prop ? prop.name : "Unknown";
  };

  // Handle approve/reject action
  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/bookings/${id}`, { status });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
      setMessage(`Booking ${status} successfully!`);
      setTimeout(() => setMessage(""), 3000);

      // Optional: Tenant creation/property update if approved
      if (status === "approved") {
        console.log(`Tenant creation and property update for booking ${id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Apply filter
  const filteredBookings =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bookings</h2>

      {message && <div style={messageStyle}>{message}</div>}

      {/* Filters */}
      <div style={{ marginBottom: "15px" }}>
        {["all", "pending", "approved", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              marginRight: "10px",
              padding: "5px 15px",
              cursor: "pointer",
              backgroundColor: filter === status ? "#2196F3" : "#f4f4f4",
              color: filter === status ? "white" : "black",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Booking List */}
      <div style={{ border: "1px solid #ccc", borderRadius: "8px" }}>
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <div>
              <strong>{booking.tenantName}</strong> –{" "}
              <Link
                to={`/properties/${booking.propertyId}`}
                style={{ textDecoration: "underline", color: "#2196F3" }}
              >
                {getPropertyName(booking.propertyId)}
              </Link>
            </div>
            <div>
              <span
                style={{
                  ...statusStyle,
                  ...getStatusColor(booking.status),
                  marginRight: "10px",
                }}
              >
                {booking.status}
              </span>
              {booking.status === "pending" ? (
                <>
                  <button
                    style={buttonStyleApprove}
                    onClick={() =>
                      handleUpdateStatus(booking.id, "approved")
                    }
                  >
                    Approve
                  </button>
                  <button
                    style={buttonStyleReject}
                    onClick={() =>
                      handleUpdateStatus(booking.id, "rejected")
                    }
                  >
                    Reject
                  </button>
                </>
              ) : (
                <button style={buttonStyleView}>View</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const buttonStyleApprove = {
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  padding: "5px 10px",
  marginRight: "5px",
  cursor: "pointer",
};
const buttonStyleReject = {
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
};
const buttonStyleView = {
  backgroundColor: "#2196F3",
  color: "white",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
};
const statusStyle = {
  padding: "5px 10px",
  borderRadius: "5px",
  color: "white",
  textTransform: "capitalize",
};
const getStatusColor = (status) => ({
  approved: { backgroundColor: "#4CAF50" },
  pending: { backgroundColor: "#FF9800" },
  rejected: { backgroundColor: "#f44336" },
}[status] || { backgroundColor: "#777" });
const messageStyle = {
  marginBottom: "10px",
  padding: "8px",
  backgroundColor: "#d4edda",
  color: "#155724",
  borderRadius: "5px",
};

export default BookingList;
