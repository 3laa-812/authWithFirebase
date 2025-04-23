import React from "react";
import { Alert, Button, Card } from "react-bootstrap";
import useAuth from "../context/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { currentUser, logOut } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      setError("Failed to log out");
      console.log(error);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser && currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile?
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button className="btn btn-primary" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
