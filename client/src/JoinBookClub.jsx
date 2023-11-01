// JoinBookClub.js
import React from 'react';
import { useDispatch } from 'react-redux';

const JoinBookClub = ({ clubId }) => {
  const dispatch = useDispatch();

  const handleJoinClub = () => {
    // Dispatch an action to join the club
    // Example: dispatch(joinClub(clubId));
  };

  return <button onClick={handleJoinClub}>Join Club</button>;
};

export default JoinBookClub;