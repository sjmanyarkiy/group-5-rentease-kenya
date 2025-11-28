import React, { useState, useEffect } from 'react';
import NavBar from '../pages/NavBar'

const initialState = {
  name: "",
  phone: "",
  email: "",
  govtIDNo: "",
  employmentStatus: "",
  employerName: "",
  moveInDate: "",
  tenantPhoto: null, // File object
  propertyId: "",
  numberOfBedrooms: "",
  country: "",
  county: "",
  city: "",
  subCounty: "",
  sublocation: "",
  estate: "",
};

function TenantForm({ tenant, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialState);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (tenant) {
      setForm(tenant);
      setPreview(tenant.tenantPhoto || null);
    } else {
      setForm(initialState);
      setPreview(null);
    }
  }, [tenant]);

  useEffect(() => {
    return () => {
      if (preview && typeof preview === "string" && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      const file = files?.[0];
      setForm(prev => ({ ...prev, [name]: file }));
      setPreview(file ? URL.createObjectURL(file) : null);
    } else if (type === "number") {
      setForm(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert photo File to Base64 (optional, JSON-server can store as string)
    if (form.tenantPhoto && form.tenantPhoto instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const tenantData = { ...form, tenantPhoto: reader.result };
        if (tenant) tenantData.id = tenant.id;
        onSubmit(tenantData);
        if (!tenant) setForm(initialState);
      };
      reader.readAsDataURL(form.tenantPhoto);
    } else {
      const tenantData = { ...form };
      if (tenant) tenantData.id = tenant.id;
      onSubmit(tenantData);
      if (!tenant) setForm(initialState);
    }

    setPreview(null);
  };

  return (
    <>
    <header>
      <NavBar />
    </header>
    <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded bg-light">
      <h3 className="mb-4">{tenant ? "Edit Tenant" : "Add Tenant"}</h3>

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

      {/* Additional fields */}
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

      {/* Location */}
      <div className="row">
        <div className="col-md-3 mb-3"><label>Country</label><input name="country" className="form-control" value={form.country} onChange={handleChange} /></div>
        <div className="col-md-3 mb-3"><label>County</label><input name="county" className="form-control" value={form.county} onChange={handleChange} /></div>
        <div className="col-md-2 mb-3"><label>City</label><input name="city" className="form-control" value={form.city} onChange={handleChange} /></div>
        <div className="col-md-2 mb-3"><label>Sub-County</label><input name="subCounty" className="form-control" value={form.subCounty} onChange={handleChange} /></div>
        <div className="col-md-2 mb-3"><label>Sublocation</label><input name="sublocation" className="form-control" value={form.sublocation} onChange={handleChange} /></div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3"><label>Estate</label><input name="estate" className="form-control" value={form.estate} onChange={handleChange} /></div>
        <div className="col-md-6 mb-3">
          <label>Tenant Photo</label>
          <input type="file" name="tenantPhoto" className="form-control" onChange={handleChange} />
          {preview && <img src={preview} alt="Preview" className="img-fluid mt-2 rounded" />}
        </div>
      </div>

      <button type="submit" className="btn btn-success me-2">{tenant ? "Update Tenant" : "Add Tenant"}</button>
      {tenant && <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>}
    </form>
    </>
  );
}

export default TenantForm;
