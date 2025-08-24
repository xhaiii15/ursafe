import React from 'react';
import styles from "../styles/Sidebar.module.css";

function Sidebar({ username, onSelect }) {

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.welcome}>Welcome, {username}</div>
      <button className={styles.button} onClick={() => onSelect('add')}>Add</button>
      <button className={styles.button} onClick={() => onSelect('all')}>View</button>
      <button className={styles.logout} onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Sidebar;
