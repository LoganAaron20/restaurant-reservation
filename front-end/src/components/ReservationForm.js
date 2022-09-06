import React, { useState } from "react";
import "./reservationForm.styles.css";
const { REACT_APP_API_BASE_URL } = process.env;

const ReservationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState("");
  const [message, setMessage] = useState("");

  // console.log(firstName);
  // console.log(lastName);
  // console.log(number);
  // console.log(date);
  // console.log(time);
  // console.log(people);
  // console.log(REACT_APP_API_BASE_URL);

  const URL = REACT_APP_API_BASE_URL;

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`${URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          mobile_number: number,
          reservation_date: date,
          reservation_time: time,
          people: people,
        }),
      });
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 201) {
        setFirstName("");
        setLastName("");
        setNumber("");
        setDate("");
        setTime("");
        setMessage("Reservation created successfully!");
        console.log(message);
      } else {
        setMessage("Reservation was not created.");
        console.log(message);
      }
    } catch (err) {
      console.log(err);
      setMessage(err);
    }
  };

  return (
    <section>
      <h2 className="page-header">
        Please fill out a reservation form below:{" "}
      </h2>
      <div className="container">
        <div className="title">Reservation</div>
        <form action="/reservations" method="post" onSubmit={handleSubmit}>
          <div className="reservation-details">
            <div className="input-box">
              <span className="details">First Name</span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                id="first_name"
                name="first_name"
                placeholder="First name"
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Last Name</span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id="last_name"
                name="last_name"
                placeholder="Last name"
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Mobile Number</span>
              <input
                type="tel"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                id="phone"
                name="mobile_number"
                placeholder="XXX-XXX-XXXX"
                required
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              />
            </div>
            <div className="input-box">
              <span className="details">Reservation date</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                id="reservation-date"
                name="reservation_date"
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Reservation time</span>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                id="reservation-time"
                name="reservation_time"
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Party Size</span>
              <input
                type="number"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                id="people"
                name="people"
                required
              />
            </div>
            <div className="buttons">
              <button className="submit" type="submit">
                Submit
              </button>
              {/* <button className="cancel">Cancel</button> */}
              <a className="cancel-link" href="/dashboard">
                Cancel
              </a>
            </div>
          </div>
          <div className="message">{message ? <h3>{message}</h3> : null}</div>
        </form>
      </div>
    </section>
  );
};

export default ReservationForm;
