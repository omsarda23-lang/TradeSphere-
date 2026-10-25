import React from "react";
import { DASHBOARD_URL } from "../../config";

function Signup() {
  return (
    <div className="container p-5 mb-5">
      <div className="row align-items-center text-center text-md-start">
        <div className="col-12 col-md-6 mb-4">
          <img
            src="media/images/signup.png"
            alt="Open an account"
            className="img-fluid"
          />
        </div>
        <div className="col-12 col-md-6 p-3">
          <h1 className="fs-2 mb-3">Open a free demat and trading account</h1>
          <p className="text-muted mb-4">
            Start investing brokerage free and manage your holdings, positions
            and orders from the dashboard.
          </p>
          <a href={DASHBOARD_URL} className="p-2 btn btn-primary fs-5">
            Continue to dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
