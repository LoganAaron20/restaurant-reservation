import React from "react";
import "./reservationCard.styles.css";

const ReservationCard = ({ reservation, key }) => {
  return (
    <section className="reservation-card col-6" id={key}>
      <h3 className="reservation-name">{reservation.first_name}</h3>
      <h4 className="party-size">Party Size: {reservation.people}</h4>
      <p className="mobile_number">{reservation.mobile_number}</p>
    </section>
  );
};

export default ReservationCard;
