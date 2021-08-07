import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router"
import { listTables, deleteTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Table from "./Table"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
export default function Tables({ tables, setTables, setReservations, tablesError}) {
  const history = useHistory();



  return (
    <main>
      <ErrorAlert error={tablesError} />
      <h1>Tables</h1>
      <div>
        <button onClick={()=>history.push("/tables/new")}>New Table</button>
      </div>
      <div>
        {tables.map((table)=> <Table passedTable={table}/>)}
      </div>
    </main>
  );
}
