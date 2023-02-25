import React from "react";
import "./Table.css";
import { useEffect } from "react";
import { getTrans } from "../../redux/transaction";
import { useDispatch, useSelector } from "react-redux";

const Table = () => {
  const dispatch = useDispatch();
  const transData = useSelector((state) => state.transaction.transactions);
  const transuser = useSelector((state) => state.transaction.user);

  useEffect(() => {
    if (transuser) {
      dispatch(getTrans(transuser._id));
    }
  }, []);

  return (
    <div className="trans_container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transData.map((t, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{t.hotel.name}</td>
                <td>{t.room.toString()}</td>

                <td>
                  {" "}
                  {t.dateStart} - {t.dateEnd}
                </td>
                <td>${t.price}</td>
                <td>{t.payment}</td>
                <td>
                  <span
                    className={
                      t.status === "Booked"
                        ? "statusBooked"
                        : t.status === "Checkin"
                        ? "statusCheckin"
                        : "statusCheckout"
                    }
                  >
                    {t.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
