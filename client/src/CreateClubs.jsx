import React, { useState } from 'react';

const CreateClubs = () => {
  const [clubInfo, setClubInfo] = useState({
    name: '',
    description: '',
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch an action to create the book club (connect to Redux)
    // Example: dispatch(createClub(clubInfo));

    // Reset the form after submission
    setClubInfo({
      name: '',
      description: '',
      image: null,
    });
  };

  const handleImageChange = (e) => {
    // Handle image selection and set it in the state
    setClubInfo({ ...clubInfo, image: e.target.files[0] });
  };

  return (
    <div>
      <h2>Create a Book Club</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Club Name:</label>
          <input
            type="text"
            id="name"
            value={clubInfo.name}
            onChange={(e) => setClubInfo({ ...clubInfo, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={clubInfo.description}
            onChange={(e) => setClubInfo({ ...clubInfo, description: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="image">Club Image:</label>
          <input
            type="file"
            id="image"
            accept=".jpg, .jpeg, .png"
            onChange={handleImageChange}
          />
        </div>
        {/* Other club-related form fields */}
        <div>
          <button type="submit">Create Club</button>
        </div>
      </form>
    </div>
  );
};

export default CreateClubs;