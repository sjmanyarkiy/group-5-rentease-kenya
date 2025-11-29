import React, { useEffect, useState } from "react";

const BookingRequestForm = () => {
  const [tenants, setTenants] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/tenants")
      .then((res) => res.json())
      .then((data) => setTenants(data));

    fetch("http://localhost:5000/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTenant || !selectedProperty) {
      alert("Please select a tenant and a property");
      return;
    }

    setLoading(true);

    const tenant = tenants.find(t => t.id === Number(selectedTenant));
    const property = properties.find(p => p.id === Number(selectedProperty));

    const newBooking = {
      tenantId: tenant.id,
      tenantName: tenant.name,
      propertyId: property.id,
      status: "pending"
    };

    const res = await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    });

    setLoading(false);

    if (res.ok) {
      alert("Booking request submitted!");
      setSelectedTenant("");
      setSelectedProperty("");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Create Booking Request</h2>

      <form onSubmit={handleSubmit}>

        {/* Select Tenant */}
        <div style={{ marginBottom: "15px" }}>
          <label>Tenant:</label>
          <select
            value={selectedTenant}
            onChange={(e) => setSelectedTenant(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">-- Select Tenant --</option>
            {tenants.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select Property */}
        <div style={{ marginBottom: "15px" }}>
          <label>Property:</label>
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
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
          disabled={loading}
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          {loading ? "Submitting..." : "Submit Booking Request"}
        </button>
      </form>
    </div>
  );
};

export default BookingRequestForm;
