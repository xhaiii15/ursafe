import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import AddDiary from '../components/AddDiary';
import AllDiaries from '../components/AllDiaries';
import styles from "../styles/Dash.module.css";

function Dash() {
  const [username, setUsername] = useState('');
  const [view, setView] = useState('add');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsername(JSON.parse(storedUser).username);
    }
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'add':
        return <AddDiary />;
      case 'all':
        return <AllDiaries />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar username={username} onSelect={setView} />
      <div className={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
}

export default Dash;
