// TenantForm.js Creates a form for creating or updating tenant information.
import React, { useState, useEffect } from 'react';

function TenantForm({ tenant, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    employmentStatus: "",
    moveInDate: "",
    country: "",
    county: "",
    city: "",
    subCounty: "",
    sublocation: "",
    estate: "",
    propertyId: "",
  });

  useEffect(() => {
    if (tenant) {
      setForm({ ...tenant });
    }
  }, [tenant]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h3>{tenant ? "Edit Tenant" : "Add Tenant"}</h3>

      {/* Name */}
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          name="name"
          className="form-control"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Phone */}
      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          name="phone"
          className="form-control"
          value={form.phone}
          onChange={handleChange}
          required
        />
      </div>

      {/* Employment Status */}
      <div className="mb-3">
        <label className="form-label">Employment Status</label>
        <input
          name="employmentStatus"
          className="form-control"
          value={form.employmentStatus}
          onChange={handleChange}
          required
        />
      </div>

      {/* Move-in Date */}
      <div className="mb-3">
        <label className="form-label">Move-in Date</label>
        <input
          type="date"
          name="moveInDate"
          className="form-control"
          value={form.moveInDate}
          onChange={handleChange}
          required
        />
      </div>

      {/* Country */}
      <div className="mb-3">
        <label className="form-label">Country</label>
        <input
          name="country"
          className="form-control"
          value={form.country}
          onChange={handleChange}
        />
      </div>

      {/* County */}
      <div className="mb-3">
        <label className="form-label">County</label>
        <input
          name="county"
          className="form-control"
          value={form.county}
          onChange={handleChange}
        />
      </div>

      {/* City */}
      <div className="mb-3">
        <label className="form-label">City</label>
        <input
          name="city"
          className="form-control"
          value={form.city}
          onChange={handleChange}
        />
      </div>

      {/* Sub-county */}
      <div className="mb-3">
        <label className="form-label">Sub-county</label>
        <input
          name="subCounty"
          className="form-control"
          value={form.subCounty}
          onChange={handleChange}
        />
      </div>

      {/* Sublocation */}
      <div className="mb-3">
        <label className="form-label">Sublocation</label>
        <input
          name="sublocation"
          className="form-control"
          value={form.sublocation}
          onChange={handleChange}
        />
      </div>

      {/* Estate */}
      <div className="mb-3">
        <label className="form-label">Estate</label>
        <input
          name="estate"
          className="form-control"
          value={form.estate}
          onChange={handleChange}
        />
      </div>

      {/* Property ID */}
      <div className="mb-3">
        <label className="form-label">Property ID</label>
        <input
          type="number"
          name="propertyId"
          className="form-control"
          value={form.propertyId}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-success">
        {tenant ? "Update Tenant" : "Add Tenant"}
      </button>
    </form>
  );
}

export default TenantForm;
