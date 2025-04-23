import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  const passConfirmationRef = useRef();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password match
    if (passRef.current.value !== passConfirmationRef.current.value)
      return setError("Passwords do not match");
    
    // Validate password strength
    if (passRef.current.value.length < 6)
      return setError("Password must be at least 6 characters long");
    
    
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passRef.current.value);
      navigate("/");
    } 
    catch (error) {
      setError("Failed to create an account: " + error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" required ref={emailRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                required
                ref={passRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password-confirm">
                Password confirmation
              </Form.Label>
              <Form.Control
                type="password"
                id="password-confirm"
                required
                ref={passConfirmationRef}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="mt-3 w-100"
              disabled={loading}
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default SignUp;
