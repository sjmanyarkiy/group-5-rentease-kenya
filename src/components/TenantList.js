import React from "react";
import NavBar from "../pages/NavBar";

function TenantList({ tenants = [], onEdit, onDelete }) {
  return (
    <>
    <header>
      <NavBar />
    </header>
    <main>
      <div className="row">
      {tenants.length === 0 ? (
        <p className="text-center">No tenants found.</p>
      ) : (
        tenants.map((tenant) => (
          <div key={tenant.id} className="col-md-4 mb-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{tenant.name}</h5>
                <small className="text-muted">Tenant ID: {tenant.id}</small>
                <p className="card-text mt-2">
                  Phone: {tenant.phone} <br />
                  Email: {tenant.email} <br />
                  Govt ID: {tenant.govtIDNo} <br />
                  Employment: {tenant.employmentStatus} <br />
                  Employer: {tenant.employerName} <br />
                  Bedrooms: {tenant.numberOfBedrooms} <br />
                  Property ID: {tenant.propertyId} <br />
                  Move-in: {tenant.moveInDate} <br />
                  Location: {tenant.estate}, {tenant.sublocation}, {tenant.subCounty}, {tenant.city}, {tenant.county}, {tenant.country}
                </p>
                <button className="btn btn-primary me-2" onClick={() => onEdit(tenant)}>Edit</button>
                <button className="btn btn-danger" onClick={() => onDelete(tenant.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
    </main>
    </>
  );
}

export default TenantList;
