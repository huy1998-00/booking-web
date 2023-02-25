import "./featured.css";

import hanoi from "../../image/hanoi.jpg";
import hcm from "../../image/hcm.jpg";
import danang from "../../image/danang.jpg";
import { useSelector } from "react-redux";

const Featured = ({ data }) => {
  const hanoiP = data.property.filter((p) => p.city === "Ha Noi");
  const hcmP = data.property.filter((p) => p.city === "Ho Chi Minh");
  const danangP = data.property.filter((p) => p.city === "Da Nang");

  return (
    <div className="featured">
      <div className="featuredItem">
        <img src={hanoi} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Hà Nội </h1>
          <h2>{hanoiP.length} properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img src={hcm} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Hồ Chí Minh </h1>
          <h2>{hcmP.length} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src={danang} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Đà Nẵng </h1>
          <h2>{danangP.length} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
