import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Login = () => {
  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  const Location = useLocation();
  const redirectPath = Location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError("");
      setLoading(true);
      await signIn(emailRef.current.value, passRef.current.value);
      navigate(redirectPath, { replace: true });
    } 
    catch (error) {
      setError("Failed to login");
      console.error("Error during login: ", error);
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">LogIn</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" required ref={emailRef}/>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control type="password" id="password" required ref={passRef}/>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3 w-100" disabled={loading}>
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/forget-pass">Forget Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
