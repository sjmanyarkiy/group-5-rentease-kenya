// Tenantlist.js Displays a list of tenants with options to edit or delete each tenant.
import React from 'react'

function TenantList({ tenants = [], onEdit, onDelete }) {
  return (
    <div className="d-flex flex-wrap">
      {tenants.length === 0 ? (
        <p>No tenants found.</p>
      ) : (
        tenants.map((tenant) => (
          <div key={tenant.id || tenant.name}>
            <div className="card m-2" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{tenant.name}</h5>
                <p className="card-text">
                  Phone: {tenant.phone} <br />
                  Employment: {tenant.employmentStatus} <br />
                  Move-in: {tenant.moveInDate} <br />
                  Location: {tenant.country}, {tenant.county}, {tenant.city}, {tenant.subCounty}, {tenant.sublocation}, {tenant.estate} <br />
                  Property ID: {tenant.propertyId}
                </p>
                <button className="btn btn-primary me-2" onClick={() => onEdit(tenant)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => onDelete(tenant.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TenantList;
