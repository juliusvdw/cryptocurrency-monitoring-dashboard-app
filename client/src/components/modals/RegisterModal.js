import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AuthContext from "../../context/auth/authContext";

const RegisterModal = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const authContext = useContext(AuthContext);
  const { userRegister } = authContext;

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = {
      username,
      password,
    };

    userRegister(formData);
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation
    >
      <form onSubmit={onSubmit}>
        <Modal.Header closeButton className=" ">
          <Modal.Title id="contained-modal-title-vcenter">
            <h2>Create Account</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="mt-1 ">Username</h5>
          <input
            style={inputStyle}
            type="text"
            placeholder="Username"
            className="form-control"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <h5 className="mt-4 ">Password </h5>
          <input
            style={inputStyle}
            type="password"
            placeholder="Password..."
            className="form-control"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <h5 className="mt-4 ">Confirm Password </h5>
          <input
            style={inputStyle}
            type="password"
            placeholder="Password..."
            className="form-control"
            value={confirmPassword}
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            className="form-control w-100"
            style={{ height: "50px" }}
          >
            <strong>Register</strong>
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

const inputStyle = {
  height: "50px",
};

export default RegisterModal;
