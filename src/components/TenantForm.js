import React, { useState, useEffect } from 'react';

const initialState = {
  name: "",
  phone: "",
  email: "",
  govtIDNo: "",
  employmentStatus: "",
  employerName: "",
  moveInDate: "",
  tenantPhoto: null,
  propertyId: "",
  numberOfBedrooms: "",
  country: "",
  county: "",
  city: "",
  subCounty: "",
  sublocation: "",
  estate: "",
};

function TenantForm({ tenant, onSubmit, existingTenants = [] }) {
  const [form, setForm] = useState(initialState);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (tenant) {
      setForm({ ...tenant });
      setPreview(tenant.tenantPhoto || null);
    } else {
      setForm(initialState);
      setPreview(null);
    }
  }, [tenant]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "tenantPhoto") {
      const file = files[0];
      setForm({ ...form, [name]: file });
      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextId = tenant
      ? tenant.id
      : existingTenants.length > 0
        ? existingTenants[existingTenants.length - 1].id + 1
        : 1;

    onSubmit({ ...form, id: nextId });
    setForm(initialState);
    setPreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded bg-light">
      <h3 className="mb-4">{tenant ? "Edit Tenant" : "Add Tenant"}</h3>

      {/* Row 1: Name, Phone, Email */}
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Name</label>
          <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Phone</label>
          <input name="phone" className="form-control" value={form.phone} onChange={handleChange} required />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Email</label>
          <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
      </div>

      {/* Row 2: Government ID, Employment Status, Employer Name */}
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Government ID No</label>
          <input name="govtIDNo" className="form-control" value={form.govtIDNo} onChange={handleChange} />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Employment Status</label>
          <input name="employmentStatus" className="form-control" value={form.employmentStatus} onChange={handleChange} />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Employer Name</label>
          <input name="employerName" className="form-control" value={form.employerName} onChange={handleChange} />
        </div>
      </div>

      {/* Row 3: Move-in Date, Property ID, Number of Bedrooms */}
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Move-in Date</label>
          <input name="moveInDate" type="date" className="form-control" value={form.moveInDate} onChange={handleChange} />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Property ID</label>
          <input name="propertyId" type="number" className="form-control" value={form.propertyId} onChange={handleChange} />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Number of Bedrooms</label>
          <input name="numberOfBedrooms" type="number" className="form-control" value={form.numberOfBedrooms} onChange={handleChange} />
        </div>
      </div>

      {/* Row 4: Location */}
      <div className="row">
        <div className="col-md-3 mb-3">
          <label className="form-label">Country</label>
          <input name="country" className="form-control" value={form.country} onChange={handleChange} />
        </div>
        <div className="col-md-3 mb-3">
          <label className="form-label">County</label>
          <input name="county" className="form-control" value={form.county} onChange={handleChange} />
        </div>
        <div className="col-md-2 mb-3">
          <label className="form-label">City</label>
          <input name="city" className="form-control" value={form.city} onChange={handleChange} />
        </div>
        <div className="col-md-2 mb-3">
          <label className="form-label">Sub-County</label>
          <input name="subCounty" className="form-control" value={form.subCounty} onChange={handleChange} />
        </div>
        <div className="col-md-2 mb-3">
          <label className="form-label">Sublocation</label>
          <input name="sublocation" className="form-control" value={form.sublocation} onChange={handleChange} />
        </div>
      </div>

      {/* Row 5: Estate and Tenant Photo */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Estate</label>
          <input name="estate" className="form-control" value={form.estate} onChange={handleChange} />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Tenant Photo</label>
          <input type="file" name="tenantPhoto" className="form-control" onChange={handleChange} />
          {preview && <img src={preview} alt="Preview" className="img-fluid mt-2 rounded" />}
        </div>
      </div>

      <button type="submit" className="btn btn-success mt-2">
        {tenant ? "Update Tenant" : "Add Tenant"}
      </button>
    </form>
  );
}

export default TenantForm;
