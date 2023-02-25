import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import Booking from "../../components/BookingForm/Booking";
import { useNavigate } from "react-router-dom";

const Hotel = () => {
  const { _id } = useParams();
  const user = useSelector((state) => state.transaction.user);
  const navigate = useNavigate();

  const url = `http://localhost:5000/client/hotels/${_id}`;

  const [detail, Setdetail] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    const request = await axios(url)
      .then((data) => {
        Setdetail(data.data);
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    if (!user) {
      alert("ban can dang nhap de su dung");
      navigate("/userlogin");
    } else {
      setClicked(true);
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleClick}>
            Reserve or Book Now!
          </button>
          <h1 className="hotelTitle">{detail.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{detail.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {detail.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {detail.photos?.map((photo, i) => (
              <div className="hotelImgWrapper">
                <img src={photo} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">{detail.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h2>
                <b>${detail.cheapestPrice}</b> (1 nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        {clicked && <Booking data={detail}></Booking>}

        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
