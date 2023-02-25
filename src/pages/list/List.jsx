import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { useSelector, useDispatch } from "react-redux";
import { search } from "../../redux/clientsearch";
import { searchingActions } from "../../redux/clientsearch";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);

  const seachoption = useSelector((state) => state.search);
  // console.log(seachoption);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   window.location.reload(false);
  // }, [data]);

  const handleSearch = () => {
    dispatch(
      searchingActions.change({
        destination: destination,

        date: {
          startDate: format(date[0].startDate, "MM/dd/yyyy"),
          endDate: format(date[0].endDate, "MM/dd/yyyy"),
        },
        options: options,
      })
    );
    dispatch(search());
  };

  const data = useSelector((state) => state.search.resultList);
  console.log(data);
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                onChange={(e) => setDestination(e.target.value)}
                placeholder={destination}
                type="text"
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                    onClick={(e) => {
                      setOptions({
                        ...options,
                        adult: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                    onClick={(e) => {
                      setOptions({
                        ...options,
                        children: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                    onClick={(e) => {
                      setOptions({
                        ...options,
                        room: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="listResult">
            {data.length <= 0 && <h1>No results</h1>}
            {data.length > 0 &&
              data.map((elm) => {
                return <SearchItem key={elm._id} data={elm}></SearchItem>;
              })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
