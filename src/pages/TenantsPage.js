// TenantsPage.js
import React, { useState } from "react";
import NavBar from "./NavBar";
import TenantForm from "../components/TenantForm";
import TenantList from "../components/TenantList";

function TenantsPage() {
  // Sample initial tenants
  const [tenants, setTenants] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "0712345678",
      employmentStatus: "Employed",
      moveInDate: "2025-11-01",
      country: "Kenya",
      county: "Nairobi",
      city: "Nairobi",
      subCounty: "Westlands",
      sublocation: "Riverside",
      estate: "Sunset Estate",
      propertyId: 101,
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "0723456789",
      employmentStatus: "Self-Employed",
      moveInDate: "2025-10-15",
      country: "Kenya",
      county: "Machakos",
      city: "Machakos",
      subCounty: "Machakos Town",
      sublocation: "Central",
      estate: "Greenview Estate",
      propertyId: 102,
    },
  ]);

  const [editingTenant, setEditingTenant] = useState(null);

  // Add or update tenant
  const handleFormSubmit = (tenantData) => {
    if (editingTenant) {
      // Update existing tenant
      setTenants((prev) =>
        prev.map((t) => (t.id === editingTenant.id ? { ...tenantData, id: t.id } : t))
      );
      setEditingTenant(null);
    } else {
      // Add new tenant
      const newTenant = { ...tenantData, id: Date.now() }; // simple unique ID
      setTenants((prev) => [...prev, newTenant]);
    }
  };

  // Edit tenant
  const handleEdit = (tenant) => {
    setEditingTenant(tenant);
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to form
  };

  // Delete tenant
  const handleDelete = (id) => {
    setTenants((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <TenantForm tenant={editingTenant} onSubmit={handleFormSubmit} />
        <hr />
        <TenantList tenants={tenants} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </>
  );
}

export default TenantsPage;
