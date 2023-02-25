import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import "./UserReg.css";

const UserReg = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // console.log(email);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // console.log(password);
  };

  const handleSubmit = async () => {
    const sendInfor = await axios
      .post("http://localhost:5000/client/signup", {
        email: email,
        password: password,
      })
      .catch((err) => {
        if (err) {
          setEmail("");
          setPassword("");
        }
        alert(err.response.data);
      });

    if (sendInfor) {
      alert("dang ki thanh cong");
      setEmail("");
      setPassword("");
      navigate("/userlogin");
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="reg_container">
        <h1 className="reg_head">Sign Up</h1>
        <input
          className="reg_input"
          value={email}
          onChange={handleEmailChange}
        ></input>
        <input
          className="reg_input"
          value={password}
          onChange={handlePasswordChange}
        ></input>
        <button onClick={handleSubmit} className="reg_btn">
          Create Account
        </button>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UserReg;
