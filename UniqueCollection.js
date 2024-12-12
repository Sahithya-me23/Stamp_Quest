import React, { useState, useEffect } from "react";
import "./UniqueCollection.css";

const UniqueCollection = () => {
  const [uniqueCollection, setUniqueCollection] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [stampDetails, setStampDetails] = useState({
    image: "",
    name: "",
    description: "",
    collectedFrom: "",
    boughtAtPrice: "",
    contact: "",
  });

  // Load collection from localStorage on component mount
  useEffect(() => {
    try {
      const storedCollection = JSON.parse(localStorage.getItem("uniqueCollection")) || [];
      if (Array.isArray(storedCollection)) {
        setUniqueCollection(storedCollection);
      }
    } catch (error) {
      console.error("Failed to load collection from localStorage:", error);
    }
  }, []);

  // Save collection to localStorage whenever collection state changes
  const saveCollectionToLocalStorage = (newCollection) => {
    try {
      localStorage.setItem("uniqueCollection", JSON.stringify(newCollection));
    } catch (error) {
      console.error("Failed to save collection to localStorage:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStampDetails({ ...stampDetails, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setStampDetails({ ...stampDetails, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Submit stamp for adding to collection
  const handleAddSubmit = (e) => {
    e.preventDefault();
  
    // Validation
    if (!stampDetails.image || !stampDetails.name || !stampDetails.boughtAtPrice || !stampDetails.contact) {
      alert("Please fill in all required fields.");
      return;
    }
  
    // Add the new stamp to the collection
    const newCollection = [...uniqueCollection, stampDetails];
    setUniqueCollection(newCollection);
    saveCollectionToLocalStorage(newCollection);
  
    // Reset the form
    setStampDetails({
      image: "",
      name: "",
      description: "",
      collectedFrom: "",
      boughtAtPrice: "",
      contact: "",
    });
    setShowAddForm(false);
  
    // Scroll to the top where the buttons are visible
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling effect
    });
  };
  

  return (
    <div className="unique-collection">
      <div className="unique-options">
        <button onClick={() => setShowAddForm(true)}>Add to My Collection</button>
        <button onClick={() => setShowAddForm(false)}>View My Collection</button>
      </div>

      {showAddForm ? (
        <form className="unique-add-form" onSubmit={handleAddSubmit}>
          <h2>Add a Stamp to Your Collection</h2>
          <input
            type="text"
            name="name"
            placeholder="Stamp Name"
            value={stampDetails.name}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Stamp Description"
            value={stampDetails.description}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="collectedFrom"
            placeholder="Stamp Collected From"
            value={stampDetails.collectedFrom}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="boughtAtPrice"
            placeholder="Bought at Price ($)"
            value={stampDetails.boughtAtPrice}
            onChange={handleInputChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
          <textarea
            name="contact"
            placeholder="Contact Details"
            value={stampDetails.contact}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="unique-view-collection">
          <h2>My Collection</h2>
          <div className="unique-collection-list">
            {uniqueCollection.length > 0 ? (
              uniqueCollection.map((stamp, index) => (
                <div className="unique-stamp-card" key={index}>
                  <img src={stamp.image} alt={stamp.name} />
                  <h3>{stamp.name}</h3>
                  <p>{stamp.description}</p>
                  <p>
                    <strong>Collected From:</strong> {stamp.collectedFrom}
                  </p>
                  <p>
                    <strong>Bought at Price:</strong> ${stamp.boughtAtPrice}
                  </p>
                  <p>
                    <strong>Contact:</strong> {stamp.contact}
                  </p>
                </div>
              ))
            ) : (
              <p>No stamps in your collection yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UniqueCollection;
