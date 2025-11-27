import React, { useState, useEffect } from 'react';
import TenantForm from '../components/TenantForm';
import TenantList from '../components/TenantList';
import NavBar from './NavBar';

function TenantsPage() {
  const [tenants, setTenants] = useState([]);
  const [editingTenant, setEditingTenant] = useState(null);

  // Load tenants from JSON server
  useEffect(() => {
    fetch("http://localhost:5000/tenants")
      .then(res => res.json())
      .then(data => setTenants(data))
      .catch(err => console.error("Failed to load tenants", err));
  }, []);

  const handleAddOrUpdateTenant = (tenantData) => {
    if (editingTenant) {
      // Update tenant
      fetch(`http://localhost:5000/tenants/${editingTenant.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tenantData),
      })
      .then(res => res.json())
      .then(updated => {
        setTenants(tenants.map(t => t.id === editingTenant.id ? updated : t));
        setEditingTenant(null);
      });
    } else {
      // Add new tenant
      fetch("http://localhost:5000/tenants", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tenantData),
      })
      .then(res => res.json())
      .then(newTenant => setTenants([...tenants, newTenant]));
    }
  };

  const handleEdit = (tenant) => setEditingTenant(tenant);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/tenants/${id}`, { method: 'DELETE' })
      .then(() => setTenants(tenants.filter(t => t.id !== id)));
  };

  return (
   <>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="container mt-4">
        
        <TenantForm tenant={editingTenant} onSubmit={handleAddOrUpdateTenant} existingTenants={tenants} />
        <hr />
        <TenantList tenants={tenants} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      </main>
    </>
  );
}

export default TenantsPage;
