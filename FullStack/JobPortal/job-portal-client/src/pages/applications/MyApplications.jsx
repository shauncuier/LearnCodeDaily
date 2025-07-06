import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('/api/applications');
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <h2>My Applications</h2>
      <ul>
        {applications.map((application) => (
          <li key={application.id}>
            <h3>{application.jobTitle}</h3>
            <p>{application.company}</p>
            <p>{application.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyApplications;
