import React from "react";

const Status = ({ loading, error }) => {
  if (loading) {
    return (
      <p className="status-msg">
        Loading... (the free server can take up to a minute to wake up)
      </p>
    );
  }
  if (error) {
    return <p className="status-msg status-error">{error}</p>;
  }
  return null;
};

export default Status;
