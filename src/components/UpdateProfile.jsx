import { useState } from "react";
import useAuth from "../context/useAuth";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();
  const passConfirmationRef = useRef();
  const navigate = useNavigate();
  const { currentUser, updateUserEmail, updateUserPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const promises = [];

      // Validate and update email if changed
      if (emailRef.current.value !== currentUser.email) {
        promises.push(updateUserEmail(emailRef.current.value));
      }

      // Validate and update password if provided
      if (passRef.current.value) {
        if (passRef.current.value !== passConfirmationRef.current.value) {
          throw new Error("Passwords do not match");
        }
        promises.push(updateUserPassword(passRef.current.value));
      }

      // If no changes, return early
      if (promises.length === 0) {
        setError("No changes were made");
        setLoading(false);
        return;
      }

      // Execute all updates
      await Promise.all(promises);
      navigate("/");
    } catch (error) {
      console.error("Update profile error:", error);
      setError(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                required
                ref={emailRef}
                defaultValue={currentUser?.email}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                ref={passRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password-confirm">
                Password confirmation
              </Form.Label>
              <Form.Control
                type="password"
                id="password-confirm"
                ref={passConfirmationRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="mt-3 w-100"
              disabled={loading}
            >
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
