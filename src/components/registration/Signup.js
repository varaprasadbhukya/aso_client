import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import GoogleLoginComp from "./GoogleLogin";
import MicrosoftLog from "./MicrosoftLogins";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  // const [modalShow, setModalShow] = useState(false);

  const handleRegistration = async (e) => {
    setSubmit(true);
    e.preventDefault();
    if (validatePassword(password)) {
      console.log("Registration successful");
      try {
        let res = await api({
          url: "/auth/signup",
          method: "POST",
          responseType: "json",
          data: {
            email,
            password,
          },
        });
        if (res.code === 200) {
          localStorage.setItem("token", res.data.data.authorization);
          navigate("/about-org");
        }
        if (res.code === 400) {
          alert("Mail Registered please signin");
          navigate("/signin");
        }
        console.log(res, "---------------->response");
      } catch (error) {
        if (error.response.status === 401) navigate("/");
      }
    } else {
      alert("Password does not meet the requirements");
    }
  };

  // const handleSocialSignIn = () => {
  //   console.log("00000000");
  // };

  const validatePassword = (password) => {
    const lowerCase = new RegExp("(?=.*[a-z])");
    const upperCase = new RegExp("(?=.*[A-Z])");
    const digit = new RegExp("(?=.*\\d)");
    const specialChar = new RegExp("(?=.*[!@#$%^&*])");
    const length = new RegExp("[a-zA-Z\\d!@#$%^&*]{8,}");

    return (
      lowerCase.test(password) &&
      upperCase.test(password) &&
      digit.test(password) &&
      specialChar.test(password) &&
      length.test(password)
    );
  };

  const lowerCase = new RegExp("(?=.*[a-z])");
  const upperCase = new RegExp("(?=.*[A-Z])");
  const digit = new RegExp("(?=.*\\d)");
  const specialChar = new RegExp("(?=.*[!@#$%^&*])");
  const length = new RegExp("[a-zA-Z\\d!@#$%^&*]{8,}");

  return (
    <>
      <div className="registration-form-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleRegistration}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="password-strength-indicator-container">
              <div
                className={`password-strength-indicator lowercase ${
                  lowerCase.test(password) ? "valid" : "invalid"
                }`}
              >
                {<span>contain small alphabet</span>}
                {lowerCase.test(password) && <span>&nbsp;✓</span>}
                {submit && !lowerCase.test(password) && (
                  <span className="crossMark">&nbsp;X</span>
                )}
              </div>
              <div
                className={`password-strength-indicator uppercase ${
                  upperCase.test(password) ? "valid" : "invalid"
                }`}
              >
                {<span>contain Capital alphabet</span>}
                {upperCase.test(password) && <span>&nbsp;✓</span>}
                {submit && !upperCase.test(password) && (
                  <span className="crossMark">&nbsp;X</span>
                )}
              </div>
              <div
                className={`password-strength-indicator digit ${
                  digit.test(password) ? "valid" : "invalid"
                }`}
              >
                {<span>contains digits</span>}
                {digit.test(password) && <span>&nbsp;✓</span>}
                {submit && !digit.test(password) && (
                  <span className="crossMark">&nbsp;X</span>
                )}
              </div>
              <div
                className={`password-strength-indicator special-char ${
                  specialChar.test(password) ? "valid" : "invalid"
                }`}
              >
                {<span>contains special characters</span>}
                {specialChar.test(password) && <span>&nbsp;✓</span>}
                {submit && !specialChar.test(password) && (
                  <span className="crossMark">&nbsp;X</span>
                )}
              </div>
              <div
                className={`password-strength-indicator length ${
                  length.test(password) ? "valid" : "invalid"
                }`}
              >
                {<span>contain 8 characters</span>}
                {length.test(password) && <span>&nbsp;✓</span>}
                {submit && !length.test(password) && (
                  <span className="crossMark">&nbsp;X</span>
                )}
              </div>
            </div>
          </div>
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <a href="/signin">Sign in</a>
        </p>
        <div className="social-login-icons">
          <GoogleLoginComp />
          {/* <img
            className="social-login-icon"
            src="/apple.png"
            alt="Apple"
            onClick={() => handleSocialSignIn("apple")}
          /> */}

          {/* <img className="social-login-icon" src="/microsoft.png" alt="Microsoft" onClick={() => handleSocialSignIn('microsoft')} /> */}
          <MicrosoftLog />
        </div>
      </div>
      {/* <Modal
      show={modalShow}
      onHide={() => { setModalShow(false); navigate("/signup") }}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm Your Email!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>A confirmation mail has been sent your mail id</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => { setModalShow(false); navigate("/signup") }}>Close</Button>
      </Modal.Footer>
    </Modal> */}
    </>
  );
};

export default Signup;
