import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Assuming you're using Material-UI Icons

function MyAccount() {
  return (
    <div>
      <h1>
        <AccountCircleIcon style={{ marginRight: '10px' }} /> My Account
      </h1>
      <p>View and manage your account details here.</p>
    </div>
  );
}

export default MyAccount;
