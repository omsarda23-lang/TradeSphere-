import React from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = ({ user }) => {
  return (
    <>
      <TopBar user={user} />
      <Dashboard />
    </>
  );
};

export default Home;
