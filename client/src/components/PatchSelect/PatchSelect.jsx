import React, { useState, useEffect, useCallback } from "react";
import "./PatchSelect.css";
import ChampionChanges from "../ChampionChanges/ChampionChanges";

export function PatchSelect() {
  const [selectedStartPatch, setSelectedStartPatch] = useState(1);
  const [selectedEndPatch, setSelectedEndPatch] = useState(23);
  const [championData, setChampionData] = useState({});
  const championName = window.location.pathname.split("/").pop();

  const handleStartPatchChange = (event) => {
    setSelectedStartPatch(parseInt(event.target.value));
  };

  const handleEndPatchChange = (event) => {
    setSelectedEndPatch(parseInt(event.target.value));
  };

  const fetchChampionData = useCallback(async () => {
    try {
      const start = Math.min(selectedStartPatch, selectedEndPatch);
      const end = Math.max(selectedStartPatch, selectedEndPatch);
      const fetchedData = await Promise.all(
        Array.from({ length: end - start + 1 }, (_, index) =>
          fetch(
            `http://localhost:3001/performance/${championName}/stats/${
              start + index
            }`
          ).then((response) => response.json())
        )
      );
      const newData = {};
      fetchedData.forEach((data, index) => {
        const patchNumber = start + index;
        const patchName = `Patch ${patchNumber}`;
        newData[patchName] = data;
      });
      setChampionData(newData);
    } catch (error) {
      console.error(error);
    }
  }, [championName, selectedStartPatch, selectedEndPatch]);

  useEffect(() => {
    fetchChampionData();
  }, [fetchChampionData]);

  return (
    <div>
      <h1>Champion Performance</h1>

      <label htmlFor="startPatch">Start Patch:</label>
      <input
        id="startPatch"
        type="range"
        min="1"
        max="23"
        value={selectedStartPatch}
        onChange={handleStartPatchChange}
      />

      <label htmlFor="endPatch">End Patch:</label>
      <input
        id="endPatch"
        type="range"
        min="1"
        max="23"
        value={selectedEndPatch}
        onChange={handleEndPatchChange}
      />

      <div>Selected Start Patch: {selectedStartPatch}</div>

      <div>Selected End Patch: {selectedEndPatch}</div>

      {Object.keys(championData).length > 0 && (
        <div>
          <table className="champions-table">
            <thead>
              <tr>
                <th>Patch</th>
                <th>Role</th>
                <th>Tier</th>
                <th>Score</th>
                <th>Trend</th>
                <th>Win</th>
                <th>Pick</th>
                <th>Ban</th>
                <th>KDA</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(championData).map(([patch, data]) =>
                Object.entries(data).map(([role, stats]) => (
                  <tr key={`${patch}-${role}`}>
                    <td>{patch}</td>
                    <td>{role}</td>
                    <td>{stats.Tier}</td>
                    <td>{stats.Score}</td>
                    <td>{stats.Trend}</td>
                    <td>{stats.Win}</td>
                    <td>{stats.Pick}</td>
                    <td>{stats.Ban}</td>
                    <td>{stats.KDA}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {selectedStartPatch !== selectedEndPatch && (
            <ChampionChanges
              selectedStartPatch={selectedStartPatch}
              selectedEndPatch={selectedEndPatch}
            />
          )}
          {Object.keys(championData).map((patch) => (
            <img
              key={patch}
              className="patch-image"
              src={`/aktualizacje/patch_${patch.split(" ")[1]}.jpg`}
              alt={patch}
            />
          ))}
        </div>
      )}
    </div>
  );
}
