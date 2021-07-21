import React from "react"


export default function Reservation ({res}) {


    return (
        <div>
            <h3>{res.first_name} {res.last_name}</h3>
            <div>Date: {res.reservation_date}, Time: {res.reservation_time}</div>
            <div>Party Size: {res.people}</div>
        </div>
    )
}