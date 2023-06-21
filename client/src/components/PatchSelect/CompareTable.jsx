import React from "react";

export default function ComparedChampionTable({ championData }) {
  const getColorForTier = (tier) => {
    switch (tier) {
      case "S":
        return "#ff9b00"; // Orange
      case "A":
        return "#08a6ff"; // Blue
      case "B":
        return "white"; // White
      case "C":
      case "D":
        return "5e0000;"; // Red
      default:
        return "inherit";
    }
  };

  return (
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
                  <td style={{ color: getColorForTier(stats.Tier) }}>
                    {stats.Tier}
                  </td>
                  <td>{stats.Score}</td>
                  <td>{stats.Trend}</td>
                  <td>
                    {" "}
                    <span
                      style={{ color: stats.Win >= 51 ? "#ff9b00" : "inherit" }}
                    >
                      {stats.Win}
                    </span>
                  </td>

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
}
