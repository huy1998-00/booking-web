import React from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useState } from "react";
import { differenceInDays } from "date-fns";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { format } from "date-fns";

const Booking = ({ data }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.transaction.user);
  const [infor, setinfor] = useState({
    fullName: user.fullName ? user.fullName : "",
    email: user.email,
    phoneNumber: user.phoneNumber ? user.phoneNumber : "",
    card: user.identityCard ? user.identityCard : "",
    _id: user._id,
    isAdmin: false,
  });
  const [payment, setpayment] = useState();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const startdate = date[0].startDate;
  const endate = date[0].endDate;
  const bookeddays = Math.abs(differenceInDays(startdate, endate));

  // console.log(bookeddays);

  const [selectedRoom, setSelectedRoom] = useState({
    rooms: [],
    Price: 0,
  });

  const handleChangeInfor = (e) => {
    const { name, value } = e.target;
    setinfor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectRoom = (e, id) => {
    const { value, checked } = e.target;
    const { rooms, Price } = selectedRoom;

    const room = data.rooms.find((r) => r._id === id);
    const roomPrice = room.price;

    if (checked) {
      setSelectedRoom({
        rooms: [...rooms, parseInt(value)],
        Price: Price + roomPrice,
      });
    } else {
      setSelectedRoom({
        rooms: rooms.filter((r) => r !== value),
        Price: Price - roomPrice,
      });
    }
  };

  const handleChangepayment = (e) => {
    setpayment(e.target.value);
  };

  const url = `http://localhost:5000/client/createtrans`;
  const handleSubmit = () => {
    axios
      .post(url, {
        user: infor,
        hotel: data._id,
        room: selectedRoom.rooms,
        dateStart: format(date[0].startDate, "dd/MM/yyyy"),
        dateEnd: format(date[0].endDate, "dd/MM/yyyy"),
        price: bookeddays * selectedRoom.Price,
        payment,
      })
      .then((res) => {
        alert(res.data);
        navigate("/usertrans");
      })
      .catch((err) => {});
  };

  return (
    <div className="reserve_container">
      <div className="date_container">
        <h1>Dates</h1>
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
          minDate={new Date()}
        />
      </div>
      <div className="form_container">
        <h1>Reserve Info</h1>
        <div className="form_items">
          <label> Your Full Name:</label>
          <input
            placeholder="Full Name"
            value={infor.fullName}
            name="fullName"
            onChange={handleChangeInfor}
          ></input>
        </div>
        <div className="form_items">
          <label> Your Email:</label>
          <input
            placeholder="Email"
            value={infor.email}
            name="email"
            onChange={handleChangeInfor}
          ></input>
        </div>
        <div className="form_items">
          <label> Your Phone Number:</label>
          <input
            placeholder="Number"
            value={infor.phoneNumber}
            name="phoneNumber"
            onChange={handleChangeInfor}
          ></input>
        </div>
        <div className="form_items">
          <label> Your Identity Card Number:</label>
          <input
            placeholder="Card Number"
            value={infor.card}
            name="card"
            onChange={handleChangeInfor}
          ></input>
        </div>
      </div>
      <div className="rooms_container">
        <h1>Select Rooms</h1>

        {data.rooms?.map((r) => {
          return (
            <div className="room_items">
              <div className="room_infor">
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <h5>Max people:{r.maxPeople}</h5>
                <h4> ${r.price}</h4>
              </div>
              <div className="room_numbers">
                {r.roomNumbers?.map((num) => {
                  return (
                    <div className="number">
                      <label>{num}</label>
                      <input
                        type="checkbox"
                        value={num}
                        onChange={(e, id = r._id) => handleSelectRoom(e, id)}
                      ></input>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="bills_container">
        <h1>Total bill : ${bookeddays * selectedRoom.Price}</h1>
        <select id="paymethod" onChange={handleChangepayment}>
          <option value="select">Select Payment Method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash">Cash</option>
        </select>
        <button onClick={handleSubmit}>Reserve Now</button>
      </div>
    </div>
  );
};

export default Booking;
