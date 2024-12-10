import React from "react";

const AdminPage = ({ loggedInUser }) => {
  return (
    <div>
      {!loggedInUser.permission ? (
        <div>Please log in with permission</div>
      ) : (
        <div>Logged in</div>
      )}
    </div>
  );
};

export default AdminPage;
