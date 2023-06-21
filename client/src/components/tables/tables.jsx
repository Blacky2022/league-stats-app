import React, { useState, useEffect, useCallback } from "react";
import "./PatchSelect.css";
import { config } from "../../config";
const baseUrl = config.BASE_URL;

export const ComparedChampionTable = (
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
