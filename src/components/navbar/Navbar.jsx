import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TransactionActions } from "../../redux/transaction";
import { useDispatch } from "react-redux";
import { getTrans } from "../../redux/transaction";

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);
  const dispatch = useDispatch();

  const [loged, setloged] = useState(false);

  const handleClickLogin = () => {
    navigate("/userlogin");
  };

  const handleSignUp = () => {
    navigate("/userreg");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload(false);
    dispatch(TransactionActions.clearUser());
  };
  const handleTrans = () => {
    dispatch(getTrans(userData._id));
    navigate("/usertrans");
  };

  useEffect(() => {
    if (user) {
      setloged(true);
    }
    dispatch(TransactionActions.updateUser());
  }, [user]);

  return (
    <div className="navbar">
      <div className="navContainer">
        <span onClick={handleHome} className="logo">
          Booking Website
        </span>
        {!loged && (
          <div className="navItems">
            <button onClick={handleSignUp} className="navButton">
              Register
            </button>
            <button onClick={handleClickLogin} className="navButton">
              Login
            </button>
          </div>
        )}
        {loged && (
          <div>
            <div className="gmail">
              <h3>{userData.email}</h3>
            </div>
            <div className="navItems">
              <button className="navButton" onClick={handleTrans}>
                Transaction
              </button>
              <button className="navButton" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
