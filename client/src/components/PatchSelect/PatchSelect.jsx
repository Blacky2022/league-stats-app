import React, { useState, useEffect, useCallback } from "react";
import "./PatchSelect.css";
import ChampionChanges from "../ChampionChanges/ChampionChanges";
import { config } from '../../config'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
const baseUrl = config.BASE_URL

export function PatchSelect() {
  const [selectedStartPatch, setSelectedStartPatch] = useState(1);
  const [selectedEndPatch, setSelectedEndPatch] = useState(23);
  const [championData, setChampionData] = useState({});
  const [compareChampion, setCompareChampion] = useState("");
  const [filteredChampions, setFilteredChampions] = useState([]);

  const championName = window.location.pathname.split("/").pop();

  const handleCompareChampionChange = (event) => {
    setCompareChampion(event.target.value);
  };

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
            `${baseUrl}/performance/${championName}/stats/${
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

      if (compareChampion) {
        const compareData = await Promise.all(
          Array.from({ length: end - start + 1 }, (_, index) =>
            fetch(
              `${baseUrl}/performance/${compareChampion}/stats/${
                start + index
              }`
            ).then((response) => response.json())
          )
        );

        compareData.forEach((data, index) => {
          const patchNumber = start + index;
          const patchName = `Patch ${patchNumber} - Compare`;
          newData[patchName] = data;
        });
      }

      setChampionData(newData);
    } catch (error) {
      console.error(error);
    }
  }, [championName, selectedStartPatch, selectedEndPatch, compareChampion]);

  useEffect(() => {
    async function fetchChampionSummary() {
      try {
        const response = await fetch(
          "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json"
        );
        const data = await response.json();
        setFilteredChampions(data.slice(1));
      } catch (error) {
        console.log("Error fetching champion summary:", error);
      }
    }
    fetchChampionSummary();
    fetchChampionData();
  }, [fetchChampionData, compareChampion]);

  const WinRateChart = () => {
    const chartData = Object.entries(championData).flatMap(([patch, data]) => {
      if (patch.includes("Compare")) return [];
      const comparePatch = `Patch ${parseInt(patch.split(" ")[1])} - Compare`;
      const compareData = championData[comparePatch];
      return Object.entries(data).map(([role, stats]) => ({
        patch,
        role,
        win: stats.Win,
        compareWin:
          compareData && compareData[role] ? compareData[role].Win : null,
      }));
    });

    const roles = Array.from(new Set(chartData.map((data) => data.role)));

    return (
      <div>
        {roles.map((role) => (
          <div key={role}>
            <h3>Role: {role}</h3>
            <LineChart
              width={800}
              height={400}
              data={chartData.filter((data) => data.role === role)}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="patch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="win"
                stroke="#8884d8"
                name="Normal Champ Win Rate"
              />
              {compareChampion && (
                <Line
                  type="monotone"
                  dataKey="compareWin"
                  stroke="#82ca9d"
                  name="Compare Champ Win Rate"
                />
              )}
            </LineChart>
          </div>
        ))}
      </div>
    );
  };

  const PickBanRateChart = () => {
    const chartData = Object.entries(championData).flatMap(([patch, data]) => {
      if (patch.includes("Compare")) return [];
      const comparePatch = `Patch ${parseInt(patch.split(" ")[1])} - Compare`;
      const compareData = championData[comparePatch];
      return Object.entries(data).map(([role, stats]) => ({
        patch,
        role,
        pick: stats.Pick,
        ban: stats.Ban,
        comparePick:
          compareData && compareData[role] ? compareData[role].Pick : null,
        compareBan:
          compareData && compareData[role] ? compareData[role].Ban : null,
      }));
    });

    const roles = Array.from(new Set(chartData.map((data) => data.role)));

    return (
      <div>
        {roles.map((role) => (
          <div key={role}>
            <h3>Role: {role}</h3>
            <LineChart
              width={800}
              height={400}
              data={chartData.filter((data) => data.role === role)}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="patch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pick"
                stroke="#82ca9d"
                name="Normal Champ Pick Rate"
              />
              <Line
                type="monotone"
                dataKey="ban"
                stroke="#ffc658"
                name="Normal Champ Ban Rate"
              />
              {compareChampion && (
                <Line
                  type="monotone"
                  dataKey="comparePick"
                  stroke="#82ca9d"
                  name="Compare Champ Pick Rate"
                />
              )}
              {compareChampion && (
                <Line
                  type="monotone"
                  dataKey="compareBan"
                  stroke="#ffc658"
                  name="Compare Champ Ban Rate"
                />
              )}
            </LineChart>
          </div>
        ))}
      </div>
    );
  };

  const SelectedChampionChart = () => {
    return (
      <div>
        <h2>Win Rate</h2>
        <WinRateChart />
        <h2>Pick and Ban Rates</h2>
        <PickBanRateChart />
      </div>
    );
  };

  const ComparedChampionTable = (
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
        {Object.entries(championData).map(([patch, data]) => (
          <React.Fragment key={patch}>
            {patch.includes("Compare") &&
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
              ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );

  const selectedChampionTable = (
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
        {Object.entries(championData).map(([patch, data]) => (
          <React.Fragment key={patch}>
            {!patch.includes("Compare") &&
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
              ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );

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
      <div>
        Compare with:
        <select value={compareChampion} onChange={handleCompareChampionChange}>
          {filteredChampions.map((champion) => (
            <option key={champion.name} value={champion.name}>
              {champion.name}
            </option>
          ))}
        </select>
      </div>
      <SelectedChampionChart />

      {selectedChampionTable}
      {ComparedChampionTable}
    </div>
  );
}

/* {Object.keys(championData).map((patch) => (
            <img
              key={patch}
              className="patch-image"
              src={`/aktualizacje/patch_${patch.split(" ")[1]}.jpg`}
              alt={patch}
            />
          ))} */
