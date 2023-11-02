import axios from 'axios';

const API_URL = 'http://localhost:5006'; // Update with your API URL

const createClub = (clubInfo, token) => {
  const formData = new FormData();

  formData.append('nameOfClub', clubInfo.name);
  formData.append('description', clubInfo.description);
  formData.append('image', clubInfo.image);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`, // Include the authorization token if required
    },
  };

  return axios.post(`${API_URL}/createClub`, formData, config);
};

// Add more API functions as needed

export default {
  createClub,
  // Export other API functions here
};
