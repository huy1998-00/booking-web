import "./searchItem.css";
import { useNavigate } from "react-router-dom";

const SearchItem = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hotels/${props.data._id}`);
  };
  return (
    <div className="searchItem">
      <img src={props.data.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 onClick={handleClick} className="siTitle">
          {props.data.name}
        </h1>
        <span className="siDistance">{props.data.distance} from center</span>
        {/* <span className="siTaxiOp">{tag}</span> */}
        <span className="siSubtitle">{props.data.desc}</span>
        <span className="siFeatures">{props.data.type}</span>
        {/* If can cancel */}
        {props.data.featured ? (
          <div>
            <span className="siCancelOp">Free cancellation </span>
            <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
            </span>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Rating</span>
          <button>{props.data.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${props.data.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
