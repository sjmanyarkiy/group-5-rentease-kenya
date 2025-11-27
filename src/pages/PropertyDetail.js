import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/properties/${id}`);
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
      <h2>{property.name}</h2>
      <img
        src={property.image}
        alt={property.name}
        style={{ width: "400px", borderRadius: "8px" }}
      />
      <p>
        <strong>Location:</strong> {property.location}
      </p>
      <p>
        <strong>Rent:</strong> {property.rent}
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
          {property.status}
        </span>
      </p>
      <p>{property.description}</p>
    </div>
  );
};

export default PropertyDetail;
