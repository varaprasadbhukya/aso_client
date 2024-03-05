import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import GoogleLoginComp from "./GoogleLogin";
import MicrosoftLog from "./MicrosoftLogins";
import api from "../../services/api";

const SignIn = ({ setActiveTab }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [modalShow, setModalShow] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      let res = await api({
        url: "/auth/signin",
        method: "POST",
        responseType: "json",
        data: {
          email,
          password,
        },
      });

      console.log(res, "--------------------->signinres")
      if (res?.status === "SUCCESS") {
        localStorage.setItem("token", res.data.authorization);
        localStorage.setItem("name", res.data.name);

        if (res?.code === 200) {
          if (res.data.registered !== true) {
            navigate("/about-org");
          } else {
            navigate("/reviews-feed");
          }
        }
      } else {
        if (res?.data?.code === 400) {
          if (res?.data?.message === "Error: Mail Not exist") {
            alert(res?.data?.message);
            setActiveTab("signup");
          } else {
            alert(res?.data?.message);
          }
        }
      }
    } catch (error) {
      if (error?.response?.status === 401) navigate("/");
    }
  };

  // const handleSocialSignIn = () => {
  //   console.log("sucess");
  // };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/reviews-feed")
    }
  })


  return (
    <>
      <div className="sign-in-container">
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>
        <p>
          Don't have an account?{" "}
          <a href="#" onClick={() => setActiveTab("signup")}>
            Register
          </a>
        </p>
        <div className="social-login-icons">
          <GoogleLoginComp />

          {/* <img
            className="social-login-icon"
            src="/apple.png"
            alt="Apple"
            onClick={() => handleSocialSignIn("apple")}
          /> */}
          <MicrosoftLog />

          {/* <img className="social-login-icon" src="/microsoft.png" alt="Microsoft" onClick={() => handleSocialSignIn('microsoft')} /> */}
        </div>
      </div>
      {/* <Modal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          navigate("/signup");
        }}
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
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setModalShow(false);
              navigate("/signup");
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default SignIn;
