import React, { useState, useEffect } from "react";
import "./Marketplace.css";

const Marketplace = () => {
  const [marketCollection, setMarketCollection] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [stampDetails, setStampDetails] = useState({
    image: "",
    name: "",
    description: "",
    price: "",
    contact: "",
    available: Math.floor(Math.random() * 10) + 1,
  });
  const [popup, setPopup] = useState(null); // For popups

  useEffect(() => {
    try {
      const storedCollection = JSON.parse(localStorage.getItem("marketCollection")) || [];
      if (Array.isArray(storedCollection)) {
        setMarketCollection(storedCollection);
      }
    } catch (error) {
      console.error("Failed to load collection from localStorage:", error);
    }
  }, []);

  const saveCollectionToLocalStorage = (newCollection) => {
    try {
      localStorage.setItem("marketCollection", JSON.stringify(newCollection));
    } catch (error) {
      console.error("Failed to save collection to localStorage:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStampDetails({ ...stampDetails, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setStampDetails({ ...stampDetails, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    if (!stampDetails.image || !stampDetails.name || !stampDetails.price || !stampDetails.contact) {
      alert("Please fill in all required fields.");
      return;
    }

    const newCollection = [...marketCollection, stampDetails];
    setMarketCollection(newCollection);
    saveCollectionToLocalStorage(newCollection);

    setStampDetails({
      image: "",
      name: "",
      description: "",
      price: "",
      contact: "",
      available: Math.floor(Math.random() * 10) + 1,
    });
    setShowAddForm(false);
  };

  const handleBuyNow = (index) => {
    const stamp = marketCollection[index];

    if (stamp.available > 0) {
      setPopup({
        type: "deliveryLocation",
        stampIndex: index,
      });
    } else {
      alert(`${stamp.name} is sold out!`);
    }
  };

  const handleDeliveryLocation = (location) => {
    if (!location.trim()) {
      alert("Please enter a valid delivery location.");
      return;
    }

    const index = popup.stampIndex;
    const newCollection = [...marketCollection];
    newCollection[index].available -= 1;

    saveCollectionToLocalStorage(newCollection);
    setMarketCollection(newCollection);

    setPopup({
      type: "tracking",
      location,
      days: Math.floor(Math.random() * 5) + 3,
    });
  };

  return (
    <div className="marketplace">
      <div className="marketplace-options">
        <button onClick={() => setShowAddForm(true)}>Sell Stamps</button>
        <button onClick={() => setShowAddForm(false)}>Buy Stamps</button>
      </div>

      {popup && popup.type === "deliveryLocation" && (
        <div className="popup">
          <h3>Enter Delivery Location</h3>
          <input
            type="text"
            placeholder="Enter your address"
            onKeyDown={(e) => e.key === "Enter" && handleDeliveryLocation(e.target.value)}
          />
          <div className="popup-buttons">
            <button
              onClick={() => {
                const input = document.querySelector(".popup input");
                if (input) handleDeliveryLocation(input.value);
              }}
            >
              Confirm
            </button>
            <button onClick={() => setPopup(null)}>Cancel</button>
          </div>
        </div>
      )}

{popup && popup.type === "tracking" && (
  <div className="popup tracking-popup">
    <h3>Order Tracking</h3>
    <div className="tracking-container">
      <div className="tracking-step">
        <div className="icon-container">
          <div className="icon-circle active">1</div>
        </div>
        <div className="step-details">
          <h4>Order Placed</h4>
          <p>Your order has been placed successfully.</p>
          <p>Estimated time: {popup.days + 2} days</p>
        </div>
      </div>
      <div className="tracking-step">
        <div className="icon-container">
          <div className="icon-circle">2</div>
        </div>
        <div className="step-details">
          <h4>On the Way</h4>
          <p>Your order is on its way.</p>
          <p>Estimated time: {popup.days - 2} days</p>
        </div>
      </div>
      <div className="tracking-step">
        <div className="icon-container">
          <div className="icon-circle">3</div>
        </div>
        <div className="step-details">
          <h4>Product Delivered</h4>
          <p>Your product will arrive soon.</p>
          <p>Estimated time: {popup.days} days</p>
        </div>
      </div>
    </div>
    <button onClick={() => setPopup(null)}>Close</button>
  </div>
)}


      {showAddForm ? (
        <form className="marketplace-add-form" onSubmit={handleAddSubmit}>
          <h2>Sell Your Stamp</h2>
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
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={stampDetails.price}
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
        <div className="marketplace-view-collection">
          <h2>Available Stamps</h2>
          <div className="marketplace-collection-list">
            {marketCollection.length > 0 ? (
              marketCollection.map((stamp, index) => (
                <div className="marketplace-stamp-card" key={index}>
                  <img src={stamp.image} alt={stamp.name} />
                  <h3>{stamp.name}</h3>
                  <p>{stamp.description}</p>
                  <p>
                    <strong>Price:</strong> ₹{stamp.price}
                  </p>
                  <p>
                    <strong>Contact:</strong> {stamp.contact}
                  </p>
                  <p>
                    <strong>Available:</strong> {stamp.available}
                  </p>
                  <button onClick={() => handleBuyNow(index)}>Buy Now</button>
                </div>
              ))
            ) : (
              <p>No stamps available for purchase.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
