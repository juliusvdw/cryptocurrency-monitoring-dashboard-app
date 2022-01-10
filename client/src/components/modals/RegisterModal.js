import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AuthContext from "../../context/auth/authContext";

const RegisterModal = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const authContext = useContext(AuthContext);
  const { userRegister, registerLoading } = authContext;

  const onSubmit = (e) => {
    e.preventDefault();

    //Validate password with confirmed password 
    if(password != confirmPassword) {
      return
    } else {
      const formData = {
        username,
        password,
      };
  
      userRegister(formData);
    }

    
  };

  const handleModalSwitch = () => {
    props.setRegisterModalShow(false);
    props.setLoginModalShow(true);
  }

  return (
    <Modal
      {...props}
      size = 'md'
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation
      
    >
      <form onSubmit={onSubmit}>
        
        <Modal.Body style = {modalBodyStyle}>

          <div style = {headerStyle} className = ''>
            <img src = '/cryptologo.png' style = {logoStyle}/>
            <h4 className = 'mt-3'>Create an account</h4>
            <p>to continue to <strong>Cryptohawk</strong></p>
          </div>
          
          <input
            style={inputStyle}
            type="email"
            placeholder="Email"
            className="form-control mb-3 w-90 mx-auto modal-input"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="Password"
            className="form-control mb-3 w-90 mx-auto  modal-input"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="Confirm Password"
            className="form-control   w-90 mx-auto modal-input"
            value={confirmPassword}
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className = 'text-center mt-3' style = {alreadyStyle}>
          <p>Already have an account? <span  className = 'modal-switch' style = {signInStyle} onClick = {() => handleModalSwitch()}>Sign In</span></p>
          </div>

          <div className = 'text-right pr-2 mt-4'>
          <button type  = ' submit' style = {btnStyle} className = 'btn btn-outline-primary'>{!registerLoading ? <>Create Account</> : <div class="spinner-border spinner-border-sm" role="status">
            <span class="sr-only">Loading...</span>
          </div>} </button>

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
  height:'570px'
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
 minWidth:'100px'
}

const alreadyStyle = {
  fontSize:'14px'
}

const signInStyle ={
  color:'#374FC9'
}


export default RegisterModal;
