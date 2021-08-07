import React from "react"
import { useHistory } from "react-router"

export default function Reservation ({res}) {
    const history = useHistory();
    function handleClick(){
        history.push(`/reservations/${res.reservation_id}/seat`)
    }
    return (
        <div>
            <h3>{res.first_name},{res.last_name} Party of: {res.people}</h3>
            <div>Date: {res.reservation_date}, Time: {res.reservation_time}</div>
            <button onClick={handleClick}>Seat</button>
        </div>
    )
}