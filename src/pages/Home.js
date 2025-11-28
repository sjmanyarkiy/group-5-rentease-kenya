import React from 'react'
import NavBar from '../pages/NavBar'

// SafeLink: use react-router's Link when available; fall back to <a> for test environments
function SafeLink({ to, children, ...rest }) {
  try {
    // require at runtime so tests that don't have react-router-dom installed don't fail at import time
    const { Link } = require('react-router-dom')
    return <Link to={to} {...rest}>{children}</Link>
  } catch (err) {
    // fallback for environments without react-router
    return <a href={to} {...rest}>{children}</a>
  }
}

function Home() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="container mt-4">
        <div className="p-4 bg-light rounded"> 
          <h1 className="mb-3">Welcome to RentEase</h1>
          <p className="lead">A simple property management frontend used with a json-server backend. Use the links below to explore data and manage listings.</p>

          <div className="d-flex gap-2 mt-3">
            <SafeLink to="/properties" className="btn btn-primary">Browse Properties</SafeLink>
            <SafeLink to="/bookings" className="btn btn-outline-secondary">Bookings</SafeLink>
            <SafeLink to="/tenants" className="btn btn-outline-secondary">Tenants</SafeLink>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
