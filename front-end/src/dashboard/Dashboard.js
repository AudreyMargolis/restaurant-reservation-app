import React from "react";
import { useHistory } from "react-router"
import ErrorAlert from "../layout/ErrorAlert";
import Reservation from "../reservations/Reservation"
import Tables from "../tables/Tables"
import { today, previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, reservations, setReservations, reservationsError, tables, setTables, tablesError }) {
 
  const history = useHistory();
  
  return (
    <main>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date} </h4>
      </div>

      <div>
        <button onClick={()=> history.push(`/dashboard?date=${previous(date)}`)}>Previous Date</button>
        <button onClick={()=> history.push(`/dashboard?date=${today()}`)}>Today</button>
        <button onClick={()=> history.push(`/dashboard?date=${next(date)}`)}>Next Date</button>
      </div>
      <ErrorAlert error={reservationsError} />
      <div>
        {reservations.map((res)=> <Reservation res={res} />)}
      </div>
      <Tables tables={tables} setTables={setTables} setReservations={setReservations} tablesError = {tablesError} />
    </main>
  );
}

export default Dashboard;
