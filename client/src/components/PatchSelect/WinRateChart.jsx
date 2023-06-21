import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

const WinRateChart = ({ championData, compareChampion }) => {
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
    <div className="win-rate-chart-container">
      {roles.map((role) => (
        <div key={role} className="chart-container">
          <h3>Role: {role}</h3>
          <LineChart
            width={600}
            height={300}
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
              name="Wybrany"
            />
            {compareChampion && (
              <Line
                type="monotone"
                dataKey="compareWin"
                stroke="#82ca9d"
                name="Porównywany"
              />
            )}
          </LineChart>
        </div>
      ))}
    </div>
  );
};

export default WinRateChart;
