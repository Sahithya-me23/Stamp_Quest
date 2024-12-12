import React, { useState } from 'react';
import "./Community.css";

const Community = () => {
  // State to toggle visibility of community links
  const [showLinks, setShowLinks] = useState(false);

  // Handle button click to toggle links visibility
  const handleJoinClick = () => {
    setShowLinks(!showLinks); // Toggle the visibility
  };

  return (
    <div className="page-content">
      <h1>Philatelist's Corner</h1>
      <p>Join our vibrant community of collectors and enthusiasts. Share your experiences and learn from others!</p>

      {/* Button to join the community */}
      <button className="join-button" onClick={handleJoinClick}>
        Join Community
      </button>

      {/* Conditional rendering of community links */}
      {showLinks && (
        <div className="community-links">
          <h2>Join us on these platforms:</h2>
          <ul>
            <li>
              <a href="https://chat.whatsapp.com/Edlx7lUTYmZ0X1mNrn2Y7g" target="_blank" rel="noopener noreferrer">
                Whatsapp Community
              </a>
            </li>
            <li>
              <a href="https://discord.gg/n2UeYmX2bA" target="_blank" rel="noopener noreferrer">
                Discord Group
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Community;
