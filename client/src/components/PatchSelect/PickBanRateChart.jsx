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

const PickBanRateChart = ({ championData, compareChampion }) => {
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
    <div className="pick-ban-rate-chart-container">
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
              dataKey="pick"
              stroke="#166088"
              name="Champion Pick Rate"
            />
            <Line
              type="monotone"
              dataKey="ban"
              stroke="#4F6D7A"
              name="Champion Ban Rate"
            />
            {compareChampion && (
              <Line
                type="monotone"
                dataKey="comparePick"
                stroke="red"
                name="Compared Champion Pick Rate"
              />
            )}
            {compareChampion && (
              <Line
                type="monotone"
                dataKey="compareBan"
                stroke="#ffc658"
                name="Compared Champion Ban Rate"
              />
            )}
          </LineChart>
        </div>
      ))}
    </div>
  );
};

export default PickBanRateChart;
