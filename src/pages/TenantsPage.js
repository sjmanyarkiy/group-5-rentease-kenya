import React, { useState, useEffect } from "react";
import TenantForm from "../components/TenantForm";
import TenantList from "../components/TenantList";

function TenantsPage() {
  const [tenants, setTenants] = useState([]);
  const [editingTenant, setEditingTenant] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    bedrooms: "",
    county: "",
    subCounty: "",
    estate: "",
    employmentStatus: "",
  });

  useEffect(() => {
    fetch("https://rentease-json-server.onrender.com/tenants")
      .then((res) => res.json())
      .then((data) => setTenants(data))
      .catch((err) => console.error("Failed to load tenants", err));
  }, []);

  const handleAddOrUpdateTenant = (tenantData) => {
    if (editingTenant) {
      fetch(`https://rentease-json-server.onrender.com/tenants/${editingTenant.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tenantData),
      })
        .then((res) => res.json())
        .then((updated) => {
          setTenants(tenants.map((t) => (t.id === updated.id ? updated : t)));
          setEditingTenant(null);
        });
    } else {
      fetch("https://rentease-json-server.onrender.com/tenants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tenantData),
      })
        .then((res) => res.json())
        .then((newTenant) => setTenants([...tenants, newTenant]));
    }
  };

  const handleEdit = (tenant) => setEditingTenant(tenant);
  const handleDelete = (id) => {
    fetch(`https://rentease-json-server.onrender.com/tenants/${id}`, { method: "DELETE" })
      .then(() => setTenants(tenants.filter((t) => t.id !== id)));
  };
  const handleCancelEdit = () => setEditingTenant(null);

  // Dynamic dropdown options
  const bedroomOptions = Array.from(new Set(tenants.map((t) => t.numberOfBedrooms))).sort();
  const countyOptions = Array.from(new Set(tenants.map((t) => t.county?.trim()))).sort();
  const subCountyOptions = Array.from(new Set(tenants.map((t) => t.subCounty?.trim()))).sort();
  const estateOptions = Array.from(new Set(tenants.map((t) => t.estate?.trim()))).sort();
  const employmentOptions = Array.from(new Set(tenants.map((t) => t.employmentStatus?.trim()))).sort();

  // Real-time filter + search
  const filteredTenants = tenants.filter((tenant) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      tenant.name.toLowerCase().includes(term) ||
      tenant.phone.toLowerCase().includes(term) ||
      tenant.email.toLowerCase().includes(term) ||
      String(tenant.propertyId).includes(term) ||
      tenant.govtIDNo.toLowerCase().includes(term) ||
      tenant.subCounty?.toLowerCase().includes(term) ||
      tenant.estate?.toLowerCase().includes(term);

    const matchesBedrooms =
      !filters.bedrooms || String(tenant.numberOfBedrooms) === filters.bedrooms;

    const matchesCounty =
      !filters.county || tenant.county?.trim() === filters.county;

    const matchesSubCounty =
      !filters.subCounty || tenant.subCounty?.trim() === filters.subCounty;

    const matchesEstate =
      !filters.estate || tenant.estate?.trim() === filters.estate;

    const matchesEmployment =
      !filters.employmentStatus || tenant.employmentStatus?.trim() === filters.employmentStatus;

    return (
      matchesSearch &&
      matchesBedrooms &&
      matchesCounty &&
      matchesSubCounty &&
      matchesEstate &&
      matchesEmployment
    );
  });

  return (
    <div className="container mt-4">
      <TenantForm
        tenant={editingTenant}
        onSubmit={handleAddOrUpdateTenant}
        onCancel={handleCancelEdit}
      />

      <hr />

      {/* Real-time Search */}
      <div className="row mb-2">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, phone, email, property ID, Govt ID, Sub-County, Estate"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Real-time single-row filters */}
      <div className="row mb-3 g-2">
        <div className="col-md-2">
          <select
            className="form-select"
            value={filters.bedrooms}
            onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
          >
            <option value="">Bedrooms</option>
            {bedroomOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={filters.county}
            onChange={(e) => setFilters({ ...filters, county: e.target.value })}
          >
            <option value="">County</option>
            {countyOptions.map((county) => (
              <option key={county} value={county}>
                {county}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={filters.subCounty}
            onChange={(e) => setFilters({ ...filters, subCounty: e.target.value })}
          >
            <option value="">Sub-County</option>
            {subCountyOptions.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={filters.estate}
            onChange={(e) => setFilters({ ...filters, estate: e.target.value })}
          >
            <option value="">Estate</option>
            {estateOptions.map((estate) => (
              <option key={estate} value={estate}>
                {estate}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={filters.employmentStatus}
            onChange={(e) =>
              setFilters({ ...filters, employmentStatus: e.target.value })
            }
          >
            <option value="">Employment Status</option>
            {employmentOptions.map((emp) => (
              <option key={emp} value={emp}>
                {emp}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-secondary w-100"
            onClick={() =>
              setFilters({
                bedrooms: "",
                county: "",
                subCounty: "",
                estate: "",
                employmentStatus: "",
              })
            }
          >
            Reset
          </button>
        </div>
      </div>

      <TenantList tenants={filteredTenants} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default TenantsPage;
