import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        // Make sure this matches the port your JSON server is running on
        const res = await axios.get(`https://rentease-json-server.onrender.com/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) return <div>Property not found</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{property.location}</h2>
      <img
        src={property.image}
        alt={property.location}
        style={{ width: "400px", borderRadius: "8px" }}
      />
      <p>
        <strong>Rent:</strong> KES {property.rent.toLocaleString()}
      </p>
      <p>
        <strong>Bedrooms:</strong> {property.bedrooms}
      </p>
      <p>
        <strong>Bathrooms:</strong> {property.bathrooms}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span
          style={{
            color:
              property.status === "vacant"
                ? "green"
                : property.status === "occupied"
                ? "red"
                : "black",
            fontWeight: "bold",
          }}
        >
          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
        </span>
      </p>
      <p>{property.description}</p>
    </div>
  );
};

export default PropertyDetail;
