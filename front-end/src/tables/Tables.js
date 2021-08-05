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
export default function Tables() {
  const [tables, setTables] = useState([]);
  const [tableError, setTableError] = useState(null);
  const history = useHistory();

  useEffect(loadTables, []);
  function delTable(table_id) {
    const abortController = new AbortController();
    setTableError(null);
    deleteTable(table_id, abortController.signal)
      .then(loadTables)
      .catch(setTableError);
    return () => abortController.abort();
  }
  function loadTables() {
    console.log("loading tables");
    const abortController = new AbortController();
    setTableError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTableError);
    return () => abortController.abort();
  }


  return (
    <main>
      <ErrorAlert error={tableError} />
      <h1>Tables</h1>
      <div>
        <button onClick={()=>history.push("/tables/new")}>New Table</button>
      </div>
      <div>
        {tables.map((table)=> <Table passedTable={table} delTable={delTable} />)}
      </div>
    </main>
  );
}
