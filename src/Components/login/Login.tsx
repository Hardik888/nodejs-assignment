import login from "../../api/login";
import "../../LoginSignUp.css";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import lock from "../assets/lock.svg";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const pass = password;
    const payload = { email, pass };
    console.log("clicked");
    console.log("userinfo", email, password);
    try {
      const response = await login(payload);
      if (response.jwttoken) {
        localStorage.setItem("jwtToken", response.jwttoken);
        setSuccess("Login successful");
        setError("");
        navigate("/dashboard");
      } else {
        setError("Login failed");
        setSuccess("");
      }
      console.log(response);
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred");
      setSuccess("");
      // Display error message in alert popup
      alert("An error occurred");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <img src={lock} width={"80px"} />
        <div className="underline"></div>
      </div>
      <Form className="inputs" onSubmit={handleSubmit}>
        {error && (
          <div className="error-alert">
            <Alert variant="danger">{error}</Alert>
          </div>
        )}
        {success && <Alert variant="success">{success}</Alert>}
        <Form.Group className="input" controlId="formEmail">
          <img src={email_icon} alt="email icon" />
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="input" controlId="formPassword">
          <img src={password_icon} alt="password icon" />
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <div className="forgot-password">
          Forgot password? <span>Click here</span>
        </div>
        <div className="submit-container">
          <Button type="submit" variant="primary" className="submit">
            Login
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="submit"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </div>
      </Form>
    </div>
  );
}
