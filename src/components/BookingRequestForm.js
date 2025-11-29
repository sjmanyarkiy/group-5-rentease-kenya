import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingRequestForm = () => {
  const [tenants, setTenants] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");

  const navigate = useNavigate();

  // Fetch tenants and properties on mount
  useEffect(() => {
    fetch("http://localhost:5000/tenants")
      .then((res) => res.json())
      .then((data) => setTenants(data))
      .catch((err) => console.error("Failed to fetch tenants:", err));

    fetch("http://localhost:5000/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error("Failed to fetch properties:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate selections
    if (!selectedTenant || !selectedProperty) {
      alert("Please select both a tenant and a property");
      return;
    }

    // Find tenant and property safely
    const tenant = tenants.find((t) => String(t.id) === String(selectedTenant));
    const property = properties.find(
      (p) => String(p.id) === String(selectedProperty)
    );

    if (!tenant || !property) {
      alert("Selected tenant or property not found");
      return;
    }

    const newBooking = {
      tenantId: tenant.id,
      tenantName: tenant.name,
      propertyId: property.id,
      status: "pending",
    };

    try {
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      });

      if (res.ok) {
        alert("Booking request submitted!");
        setSelectedTenant("");
        setSelectedProperty("");

        // Redirect to Dashboard to see updated bookings
        navigate("/dashboard");
      } else {
        alert("Failed to submit booking request");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting booking request");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>New Booking Request</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Tenant:</label>
          <select
            value={selectedTenant}
            onChange={(e) => setSelectedTenant(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value="">-- Select Tenant --</option>
            {tenants.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Property:</label>
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value="">-- Select Property --</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.location}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Booking Request
        </button>
      </form>
    </div>
  );
}

export default BookingRequestForm;
