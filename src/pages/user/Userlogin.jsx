import { React, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./Userlogin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TransactionActions } from "../../redux/transaction";
import { useDispatch } from "react-redux";
import { getTrans } from "../../redux/transaction";

const Userlogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const [user, setUser] = useState([]);
  const dispatch = useDispatch();

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
      .post("http://localhost:5000/client/login", {
        email: email,
        password: password,
      })
      .then((result) => {
        const user = JSON.stringify(result.data[0]);
        localStorage.setItem("user", user);
        console.log(result);
        alert("dang nhap thanh cong");
        setEmail("");
        setPassword("");
        dispatch(TransactionActions.updateUser());
        dispatch(getTrans(result.data[0]._id));
        navigate("/");
      })
      .catch((err) => {
        if (err) {
          setEmail("");
          setPassword("");
        }
        alert(err.response.data);
      });
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="login_container">
        <h1 className="login_head">Login</h1>
        <input
          className="login_input"
          value={email}
          onChange={handleEmailChange}
        ></input>
        <input
          className="login_input"
          value={password}
          onChange={handlePasswordChange}
        ></input>
        <button className="login_btn" onClick={handleSubmit}>
          Login
        </button>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Userlogin;
