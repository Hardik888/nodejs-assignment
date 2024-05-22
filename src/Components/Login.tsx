import "./LoginSignUp.css";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <Form className="inputs" onSubmit={handleSubmit}>
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
