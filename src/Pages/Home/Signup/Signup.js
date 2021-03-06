import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../Firebase/firebase.init";
import "./Signup.css";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";

const provider = new GoogleAuthProvider();
const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [regTogglePassInput, setRegTogglePassInput] = useState(false);
  const [toggleConPassInput, setToggleConPassInput] = useState(false);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    Value: "",
    error: "",
  });

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Log successful");
        navigate("/");
      })
      .catch((error) => {
        const errorMassage = error.message;
        setError(errorMassage);
      });
  };

  const emailInput = (emailInput) => {
    if (/\S+@\S+\.\S+/.test(emailInput)) {
      setEmail({ value: emailInput, error: "" });
    } else {
      setEmail({ value: "", error: "Please Enter Valid Email" });
    }
  };
  const passwordInput = (passwordInput) => {
    if (passwordInput.length < 6) {
      setPassword({ value: "", error: "Password Minimum of 6 Characters" });
    } else {
      setPassword({ value: passwordInput, error: "" });
    }
  };
  const confirmPasswordInput = (confirmPasswordInput) => {
    if (confirmPasswordInput !== password) {
      setConfirmPassword({ value: confirmPasswordInput, error: "" });
    } else {
      setConfirmPassword({ value: "", error: "Password don't matched" });
    }
  };

  // create user with email and password
  const handleFormSubmit = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        navigate("/");
        varifyEmail();
      })
      .catch((error) => {
        const errorMassage = error.message;
        setError(errorMassage);
      });
  };

  // google signin

  // email varification
  const varifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      toast.success("email varification send", { id: "toast8" });
    });
  };

  return (
    <div className="login">
      <form onSubmit={handleFormSubmit} className="form">
        <h3>Please Register!!</h3>
        <div className="email-password-input">
          <input
            onBlur={(event) => emailInput(event.target.value)}
            className="inputs"
            type="email"
            name="email"
            placeholder="Email..."
            id=""
            required
          />
          <p className="error-text">{email.error}</p>
        </div>
        <div className="email-password-input">
          <input
            onBlur={(event) => passwordInput(event.target.value)}
            className="inputs"
            type={regTogglePassInput ? "password" : "text"}
            name="password"
            placeholder="Password..."
            id=""
            required
          />
          <label
            onClick={() => setRegTogglePassInput(!regTogglePassInput)}
            className="labels"
            htmlFor="password"
          >
            {regTogglePassInput ? (
              <AiFillEye></AiFillEye>
            ) : (
              <AiFillEyeInvisible></AiFillEyeInvisible>
            )}
          </label>
          <p className="error-text">{password.error}</p>
        </div>
        <div className="email-password-input">
          <input
            onBlur={(event) => confirmPasswordInput(event.target.value)}
            className="inputs"
            type={toggleConPassInput ? "password" : "text"}
            name="confirmPassword"
            placeholder="Confirm Password..."
            id=""
            required
          />
          <label
            onClick={() => setToggleConPassInput(!toggleConPassInput)}
            className="labels"
            htmlFor="confirmPassword"
          >
            {toggleConPassInput ? (
              <AiFillEye></AiFillEye>
            ) : (
              <AiFillEyeInvisible></AiFillEyeInvisible>
            )}
          </label>
          <p className="error-text">{confirmPassword.error}</p>
        </div>
        <p style={{ color: "red" }}>{error}</p>
        <input className="register-btn" type="submit" value="Register" />
        <p style={{ fontSize: "18px" }}>
          Alrady have an account?{" "}
          <span onClick={() => navigate("/login")} className="forget-pass">
            login
          </span>
        </p>
        <div className="option">
          <div className="option-left"></div>
          <p>or</p>
          <div className="option-right"></div>
        </div>
        <button onClick={() => googleSignIn()} className="google-signup">
          <FcGoogle style={{ fontSize: "25px" }}></FcGoogle> Sign up with google
        </button>
      </form>
    </div>
  );
};

export default Signup;
