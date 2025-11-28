import React from 'react';
import NavBar from '../pages/NavBar';

function AddNewForm() {

    function handleSubmit(){
        console.log("PropertyAdd submitted")
    }


  return (
    <>
    <header>
        <NavBar />
    </header>
    <main>
        <form className="mb-3" onSubmit={handleSubmit}>
            <h2>Add New Property</h2>
            <div>
                <label for="exampleFormControlTextarea1" className="form-label"> Location</label>
                <select className="form-select" aria-label="Default select example">
                <option selected>None selected</option>
                <option value="nairobi">Nairobi</option>
                <option value="kisumu">Kisumu</option>
                <option value="machakos">Machakos</option>
            </select>
            </div>
            <div className="mb-3">
                <label for="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" rows="3"></textarea>
            </div>
           <div className="mb-3">
                <label for="rent" className="form-label">Rent:</label>
                <input className="form-control" id="rent" type="number" name="rent"></input>
           </div>
           <div className="mb-3">
                <label for="bedrooms" className="form-label">No. of bedrooms:</label>
                <input className="form-control" id="bedrooms" type="number" name="bedrooms"></input>
           </div>
            <div className="mb-3">
                <label for="bathrooms" className="form-label">No. of bathrooms:</label>
                <input className="form-control" id="bathrooms" type="number" name="bathrooms"></input>
            </div>
            <button className="btn btn-primary" type="button">Add Property</button>
        </form>

        
    </main>
    </>
  )
}

export default AddNewForm
