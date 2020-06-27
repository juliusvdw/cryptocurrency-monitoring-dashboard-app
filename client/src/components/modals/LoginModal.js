import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AuthContext from "../../context/auth/authContext";

const LoginModal = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authContext = useContext(AuthContext);
  const { userLogin } = authContext;

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = {
      username,
      password,
    };

    userLogin(formData);
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation
      classname="bg-dark"
    >
      <form onSubmit={onSubmit}>
        <Modal.Header closeButton className=" text-center">
          <Modal.Title id="contained-modal-title-vcenter text-center">
            <div className="mx-auto">
              <h2 className="mx-auto">Log In</h2>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ minHeight: "150px", marginTop: "15px" }}
          className="mx-auto "
        >
          <input
            style={inputStyle}
            type="text"
            placeholder="Username"
            className="form-control mb-4"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            style={inputStyle}
            type="password"
            placeholder="Password"
            className="form-control mb-2"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            className="form-control w-90"
            style={{ height: "50px" }}
          >
            <strong>Login</strong>
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

const inputStyle = {
  height: "50px",
};

export default LoginModal;
