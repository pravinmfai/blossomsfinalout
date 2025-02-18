import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Ensure you import axios
import "../styles/userPage.css";

const UserPage = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        profilePic: "/assets/profile-icon.png", // Default profile picture
    });
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");  // Redirect to login if token is not found
            return;
        }

        // Fetch user details from MongoDB through API
        const fetchUserData = async () => {
            try {
                const response = await axios.get("https://blossomsfinalout.onrender.com/api/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Send the token with the request
                    },
                });
                setUser(response.data);  // Update user state with data from MongoDB
            } catch (error) {
                console.error("Error fetching user data", error);
                navigate("/login");  // Redirect if error occurs (e.g., expired session)
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser({ ...user, profilePic: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            // Send the updated user data to MongoDB
            const response = await axios.put(
                "https://blossomsfinalout.onrender.com/api/user/profile", 
                {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    profilePic: user.profilePic,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                alert("Profile updated successfully!");
                setIsEditing(false);
            } else {
                alert("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("There was an error updating your profile.");
        }
    };

    return (
        <div className="user-container">
            <div className="user-card">
                <label htmlFor="profilePicInput">
                    <img src={user.profilePic} alt="User" className="profile-icon" />
                </label>
                <input
                    type="file"
                    id="profilePicInput"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    hidden
                />

                {isEditing ? (
                    <input 
                        type="text" 
                        name="name" 
                        value={user.name} 
                        onChange={handleInputChange} 
                        className="edit-input"
                        placeholder="Name"
                    />
                ) : (
                    <h2 className="user-name">{user.name}</h2>
                )}

                {isEditing ? (
                    <>
                        <input 
                            type="email" 
                            name="email" 
                            value={user.email} 
                            onChange={handleInputChange} 
                            className="edit-input"
                            placeholder="Email"
                        />
                        <input 
                            type="text" 
                            name="phone" 
                            value={user.phone} 
                            onChange={handleInputChange} 
                            className="edit-input"
                            placeholder="Phone"
                        />
                    </>
                ) : (
                    <>
                        <p className="user-info"><strong>Email:</strong> {user.email}</p>
                        <p className="user-info"><strong>Phone:</strong> {user.phone}</p>
                    </>
                )}

                {isEditing ? (
                    <button className="save-btn" onClick={handleSave}>Save</button>
                ) : (
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
                )}
                <button className="logout-btnn" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default UserPage;
