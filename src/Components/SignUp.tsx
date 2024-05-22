import "./LoginSignUp.css";
import email_icon from "../assets/email.png";
import person_icon from "../assets/person.png";
import password_icon from "../assets/password.png";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Handle form submission here
    console.log({ name, email, password });
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <Form className="inputs" onSubmit={handleSubmit}>
        <Form.Group className="input" controlId="formName">
          <img src={person_icon} alt="person icon" />
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
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
            Sign Up
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="submit"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}
