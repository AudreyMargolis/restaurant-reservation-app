import React from "react";






export default function Table({table, clearTable}) {


  function handleClick() {
      clearTable(table.table_id);
  }
  return (
    <main>
      <h1>{table.table_name}</h1>
      <h3>Capacity: {table.capacity}</h3>
      <h3 data-table-id-status={table.table_id}>{table.reservation_id ? "occupied"
      : "free"}</h3>
      <h3>{table.reservation_id ? <button data-table-id-finish={table.table_id} onClick={handleClick}>Finish</button>
      : ""}</h3>
      <div>
        {/* <button onClick={()=>delTable(table.table_id)}>Clear Table</button> */}
      </div>
    </main>
  );
}
