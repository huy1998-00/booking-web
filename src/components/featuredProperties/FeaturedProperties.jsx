import { da } from "date-fns/locale";
import "./featuredProperties.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const FeaturedProperties = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios("http://localhost:5000/client/top3").then((data) => {
      setData(data.data);
    });
  }, []);

  return (
    <div className="fp">
      {data?.slice(0, 3)?.map((p) => {
        return (
          <div className="fpItem" key={p._id}>
            <img src={p.photos[0]} alt="" className="fpImg" />
            <span className="fpName">
              <Link to={`/hotels/${p._id}`}>{p.name}</Link>
            </span>
            <span className="fpCity">{p.city}</span>
            <span className="fpPrice">Starting from ${p.cheapestPrice}</span>
            <div className="fpRating">
              <button>{p.rating}</button>
              <span>Rating</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedProperties;

{
  /* <div className="fpItem">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1"
          alt=""
          className="fpImg"
        />
        <span className="fpName">
          <a href="./hotels/0" target="_blank">
            Comfort Suites Airport
          </a>
        </span>
        <span className="fpCity">Austin</span>
        <span className="fpPrice">Starting from $140</span>
        <div className="fpRating">
          <button>9.3</button>
          <span>Exceptional</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/232902339.jpg?k=3947def526b8af0429568b44f9716e79667d640842c48de5e66fd2a8b776accd&o=&hp=1"
          alt=""
          className="fpImg"
        />
        <span className="fpName">
          <a href="./hotels/0" target="_blank">
            Four Seasons Hotel
          </a>
        </span>
        <span className="fpCity">Lisbon</span>
        <span className="fpPrice">Starting from $99</span>
        <div className="fpRating">
          <button>8.8</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1"
          alt=""
          className="fpImg"
        />
        <span className="fpName">
          <a href="./hotels/0" target="_blank">
            Hilton Garden Inn
          </a>
        </span>
        <span className="fpCity">Berlin</span>
        <span className="fpPrice">Starting from $105</span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div> */
}
