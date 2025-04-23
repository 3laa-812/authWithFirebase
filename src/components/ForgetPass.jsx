import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";
import { useState } from "react";
import { useRef } from "react";

const ForgetPass = () => {
  const  { resetPassword}   = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [massege, setMassege] = useState("");
  const emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMassege("Check your inbox for further instructions");
    } 
    catch (error) {
      setError("Try again");
      console.error("Error during reset-password:", error);
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {massege && <Alert variant="success">{massege}</Alert>} 
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" required ref={emailRef}/>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3 w-100" disabled={loading}>
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default ForgetPass;
