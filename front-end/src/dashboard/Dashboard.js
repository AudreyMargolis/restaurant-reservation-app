import React, { useEffect, useState } from "react";
import { useParams } from "react-router"
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservation from "../reservations/Reservation"
import { today, previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date = null }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [reservation_date, setReservation_date] = useState(date);
  const params = useParams()
  useEffect (()=>{
    if(params.date){
      setReservation_date(params.date);
    }
  },[]) 

  useEffect(loadDashboard, [reservation_date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations( {date:reservation_date} , abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }


  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {reservation_date} </h4>
      </div>
      <div>
        <button onClick={()=>setReservation_date(previous(reservation_date))}>Previous Date</button>
        <button onClick={()=>setReservation_date(today())}>Today</button>
        <button onClick={()=>setReservation_date(next(reservation_date))}>Next Date</button>
      </div>
      <ErrorAlert error={reservationsError} />
      <div>
        {reservations.map((res)=> <Reservation res={res} />)}
      </div>
    </main>
  );
}

export default Dashboard;
