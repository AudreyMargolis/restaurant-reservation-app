import React, { useEffect, useState } from "react";
import { useParams } from "react-router"
import ErrorAlert from "../layout/ErrorAlert";




export default function Table({passedTable}) {
const [table, setTable] = useState(passedTable);


  return (
    <main>
      <h1>{table.table_name}</h1>
      <h3>Capacity: {table.capacity}</h3>
      <h3>{table.reservation_id ? "Occupied" : "Open"}</h3>
      <div>
        {/* <button onClick={()=>delTable(table.table_id)}>Clear Table</button> */}
      </div>
    </main>
  );
}
