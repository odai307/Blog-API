import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go to Dashboard</Link>
    </div>
  );
};

export default NotFound;