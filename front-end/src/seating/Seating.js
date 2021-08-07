import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { readReservation } from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert"

export default function Seating () {
    const [reservation, setReservation] = useState({});
    const [reservationError, setReservationError] = useState(null)
    const params = useParams();

    useEffect(loadReservation, []);

    function loadReservation() {
        const abortController = new AbortController();
        setReservationError(null);
        readReservation( {id:params.reservation_id} , abortController.signal)
        .then(setReservation)
        .catch(setReservationError);
        return () => abortController.abort();
    }
    return (
        <main>
            <ErrorAlert error={reservationError} />
            <h3>Seating for reservation: ${reservation.first_name}, party of ${reservation.people}</h3>
        </main>
    )
}