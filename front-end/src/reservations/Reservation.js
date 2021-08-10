import React from "react"
import { Link } from "react-router-dom"

export default function Reservation ({res}) {
    
    return (
        <div>
            <h3>{res.first_name},{res.last_name} Party of: {res.people}</h3>
            <div>Date: {res.reservation_date}, Time: {res.reservation_time}</div>
            <div data-reservation-id-status={res.reservation_id}>{res.status}</div>
            {res.status !="seated" ? <Link
                        to={`/reservations/${res.reservation_id}/seat`}
                        className="btn btn-light m-2"
                        >
                        Seat
                        </Link> : ""}                
        </div>
    )
}