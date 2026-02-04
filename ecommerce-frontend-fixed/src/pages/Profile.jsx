import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth(); // Assuming your AuthContext provides the user object
  const navigate = useNavigate();
  
  // State for Address Management
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState("No address saved yet.");

  const cardStyle = { 
    border: '1px solid #ddd', 
    padding: '20px', 
    borderRadius: '8px', 
    background: 'white', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '10px',
    transition: 'transform 0.2s'
  };

  const handleSaveAddress = () => {
    // Here you would typically fetch('http://localhost:5000/api/auth/update', ...)
    setIsEditing(false);
    alert("Address updated locally!");
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '50px auto', padding: '0 20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Your Account</h1>
      <p style={{ color: '#666' }}>Manage your info, orders, and security.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
        
        {/* VIEW HISTORY */}
        <div style={{...cardStyle, cursor: 'pointer'}} onClick={() => navigate('/orders')}>
          <div style={{ fontSize: '2rem' }}>📦</div>
          <h3 style={{ margin: '0' }}>Your Orders</h3>
          <p style={{ color: '#555', fontSize: '0.9rem' }}>Track, return, or buy things again</p>
        </div>

        {/* ACCOUNT INFO */}
        <div style={cardStyle}>
          <div style={{ fontSize: '2rem' }}>🔒</div>
          <h3 style={{ margin: '0' }}>Login & Security</h3>
          <p style={{ color: '#555', fontSize: '0.9rem' }}><strong>Name:</strong> {user?.name || "snappy"}</p>
          <p style={{ color: '#555', fontSize: '0.9rem' }}><strong>Email:</strong> {user?.email || "snappy1@gmail.com"}</p>
          <button style={{ marginTop: '10px', padding: '8px', cursor: 'pointer' }}>Edit Profile</button>
        </div>

        {/* ADDRESS MANAGEMENT - NOW FUNCTIONAL */}
        <div style={cardStyle}>
          <div style={{ fontSize: '2rem' }}>📍</div>
          <h3 style={{ margin: '0' }}>Addresses</h3>
          {isEditing ? (
            <>
              <textarea 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                style={{ width: '100%', height: '60px', padding: '5px' }}
              />
              <button onClick={handleSaveAddress} style={{ background: '#febd69', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}>Save Address</button>
            </>
          ) : (
            <>
              <p style={{ color: '#555', fontSize: '0.9rem' }}>{address}</p>
              <button onClick={() => setIsEditing(true)} style={{ background: 'none', border: '1px solid #ccc', padding: '5px', borderRadius: '4px', cursor: 'pointer' }}>Update Address</button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;