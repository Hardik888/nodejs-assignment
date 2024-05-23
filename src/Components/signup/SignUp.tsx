import "../../LoginSignUp.css";
import email_icon from "../assets/email.png";
import person_icon from "../assets/person.png";
import password_icon from "../assets/password.png";
import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import signup from "../../api/signup";

export default function SignUpPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const dobString = new Date(dob).toISOString().slice(0, 10);
      const payload = {
        name: name,
        dateofBirth: dobString,
        email: email,
        pass: password,
      };
      console.log("clicked");
      console.log(payload);
      const response = await signup(payload);
      console.log(response);
      if (response.response.acknowledged) {
        setSuccess("User registered successfully");
        setError("");

        setName("");
        setEmail("");
        setPassword("");
        setDob("");
        navigate("/login");
      } else {
        setError("Registration failed");
        setSuccess("");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred");
      setSuccess("");

      alert("An error occurred");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="underline"></div>
      </div>
      <Form className="inputs" onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
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
        <Form.Group className="input" controlId="formDob">
          <img alt="DOB" />
          <Form.Control
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
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
