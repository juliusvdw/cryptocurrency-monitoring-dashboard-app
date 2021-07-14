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

  const handleModalSwitch = () => {
    props.setLoginModalShow(false);
    props.setRegisterModalShow(true);
  }


  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation
    >
      <form onSubmit={onSubmit}>
        
        <Modal.Body
          style={modalBodyStyle}
          className="mx-auto "
        >

            < div style = {headerStyle} className = ''>
              <img src = '/cryptologo.png' style = {logoStyle}/>
              <h4 className = 'mt-3'>Sign in</h4>
              <p>to continue to <strong>Cryptohawk</strong></p>
            </div>

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

            <div className = 'text-center mt-3' style = {alreadyStyle}>
            <p>Dont't have an account? <span className = 'modal-switch' style = {signInStyle} onClick = {() => handleModalSwitch()}>Create Account</span></p>
            </div>

            <div className = 'text-right pr-2 mt-4'>
            <button type  = ' submit' style = {btnStyle} className = 'btn btn-outline-primary'>Sign In</button>

          </div>
        </Modal.Body>
        
      </form>
    </Modal>
  );
};



const inputStyle = {
  height: "60px",
  borderRadius:'10px',
  backgroundColor:'#F9F9F9',
  opacity:'0,6'
};

const modalBodyStyle = {
  height:'520px'
}

const headerStyle = {
  width:'100%',
  textAlign:'center',
  marginTop:'20px',
  marginBottom:'50px'
}

const logoStyle = {
  height :'60px',
  width :'60px',
}

const btnStyle = {
 height:'50px',
 borderRadius:'10px',
 fontWeight:'bold',
 fontSize:'13px',
 width:'90px'
}

const alreadyStyle = {
  fontSize:'14px'
}

const signInStyle ={
  color:'#374FC9'
}

export default LoginModal;
