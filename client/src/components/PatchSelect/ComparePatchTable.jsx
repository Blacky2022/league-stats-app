import React from "react";

export default function ComparePatchTable({
  patchData,
  comparedChampion,
  championName,
}) {
  const { patchNotes, comparedPatchNotes } = patchData;

  if (!patchNotes || patchNotes.length === 0) {
    return (
      <div className="compare-container">
        <p>
          {championName} was not changed during this time period or data is
          missing.
        </p>
        <table className="champions-table">
          <thead>
            <tr>
              <th>Patch Number</th>
              <th>Update Description</th>
              <th>Buff</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>No data</td>
              <td>No data available</td>
              <td>No data available</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (!comparedPatchNotes || comparedPatchNotes.length === 0) {
    return (
      <div className="compare-container">
        <p>
          {comparedChampion} was not changed during this time period or data is
          missing.
        </p>
        <table className="champions-table">
          <thead>
            <tr>
              <th>Patch Number</th>
              <th>Update Description</th>
              <th>Buff</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>No data</td>
              <td>No data available</td>
              <td>No data available</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <div className="compare-container">
        <div>
          <h2>{championName}</h2>
          <table className="champions-table">
            <thead>
              <tr>
                <th>Patch Number</th>
                <th>Update Description</th>
                <th>Buff</th>
              </tr>
            </thead>
            <tbody>
              {patchNotes.map((note, index) => (
                <tr key={index}>
                  <td>{note.patchNumber}</td>
                  <td>{note.opis}</td>
                  <td>{note.czy_buff ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2>{comparedChampion}</h2>
          <table className="champions-table">
            <thead>
              <tr>
                <th>Patch Number</th>
                <th>Update Description</th>
                <th>Buff</th>
              </tr>
            </thead>
            <tbody>
              {comparedPatchNotes.map((note, index) => (
                <tr key={index}>
                  <td>{note.patchNumber}</td>
                  <td>{note.opis}</td>
                  <td>{note.czy_buff ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
