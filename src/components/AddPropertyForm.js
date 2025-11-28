import React, { useState } from 'react'

export default function AddPropertyForm({ onAdd }) {
  const API = process.env.REACT_APP_API_URL || 'http://localhost:5000'
  const [form, setForm] = useState({
    location: '',
    image: '',
    rent: '',
    bedrooms: '',
    bathrooms: '',
    status: 'vacant',
    description: ''
  })
  const [submitting, setSubmitting] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    // Normalize numeric fields
    const payload = {
      ...form,
      rent: Number(form.rent) || 0,
      bedrooms: Number(form.bedrooms) || 0,
      bathrooms: Number(form.bathrooms) || 0
    }

    try {
      const res = await fetch(`${API}/properties`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (onAdd) onAdd(data)
      // reset form
      setForm({ location: '', image: '', rent: '', bedrooms: '', bathrooms: '', status: 'vacant', description: '' })
    } catch (err) {
      console.error('Failed to add property', err)
      alert('Failed to add property — see console for details')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>Add new property</h5>
      <div className="row g-2">
        <div className="col-md-3">
          <input name="location" value={form.location} onChange={handleChange} className="form-control" placeholder="Location" required />
        </div>
        <div className="col-md-3">
          <input name="image" value={form.image} onChange={handleChange} className="form-control" placeholder="Image URL" />
        </div>
        <div className="col-md-2">
          <input name="rent" value={form.rent} onChange={handleChange} type="number" className="form-control" placeholder="Rent" />
        </div>
        <div className="col-md-1">
          <input name="bedrooms" value={form.bedrooms} onChange={handleChange} type="number" className="form-control" placeholder="Beds" />
        </div>
        <div className="col-md-1">
          <input name="bathrooms" value={form.bathrooms} onChange={handleChange} type="number" className="form-control" placeholder="Baths" />
        </div>
        <div className="col-md-2">
          <select name="status" value={form.status} onChange={handleChange} className="form-select">
            <option value="vacant">vacant</option>
            <option value="occupied">occupied</option>
          </select>
        </div>
      </div>
      <div className="mt-2">
        <textarea name="description" value={form.description} onChange={handleChange} className="form-control" placeholder="Description" rows={2} />
      </div>
      <div className="mt-2">
        <button className="btn btn-primary" type="submit" disabled={submitting}>{submitting ? 'Adding...' : 'Add property'}</button>
      </div>
    </form>
  )
}
