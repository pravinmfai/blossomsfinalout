import React from 'react';


const Dashboard = () => {


    return (
        <div style={styles.container}>
            <h1>Welcome to the Dashboard</h1>
            <p>You have successfully logged in!</p>
            <div style={styles.card}>
                <h3>Dashboard Content</h3>
                <p>This is a dummy dashboard. You can add your actual content here.</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '50px',
    },
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        margin: '20px auto',
        maxWidth: '500px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }
};

export default Dashboard;
