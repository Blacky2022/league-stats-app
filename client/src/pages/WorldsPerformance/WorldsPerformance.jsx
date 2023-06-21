import React, { useEffect, useState } from "react";
import "./Worldsperfomance.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { AuthProvider } from "../../components/AuthContext";
import { config } from "../../config";
export function WorldsPerformance() {
  const baseUrl = config.BASE_URL;
  const [champions, setChampions] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${baseUrl}/worlds/champions`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setChampions(data))
      .catch((error) => console.error("Błąd pobierania postaci:", error));
  }, [token]);

  const totalGames = 127; // Ilość rozegranych gier na mistrzostwach

  const calculateWinRate = (winTotal, sumTotal) => {
    const winRate = (winTotal / sumTotal) * 100;
    return winRate.toFixed(2);
  };

  const calculatePickRate = (sumPickBan, sumBans) => {
    const pickRate = ((sumPickBan - sumBans) / totalGames) * 100;
    return pickRate.toFixed(2);
  };

  const calculateBanRate = (sumBans) => {
    const banRate = (sumBans / totalGames) * 100;
    return banRate.toFixed(2);
  };

  const calculatePickBanRate = (sumPickBan) => {
    const pickBanRate = (sumPickBan / totalGames) * 100;
    return pickBanRate.toFixed(2);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      // If the same column is clicked again, reverse the sort direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Sort by the selected column in ascending order
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortIndicator = (column) => {
    if (sortColumn === column) {
      return sortDirection === "asc" ? "▲" : "▼";
    }
    return null;
  };

  const sortedChampions = [...champions].sort((a, b) => {
    if (sortColumn === "champion") {
      return sortDirection === "asc"
        ? a.champion.localeCompare(b.champion)
        : b.champion.localeCompare(a.champion);
    } else {
      const aValue =
        sortColumn === "win_rate"
          ? calculateWinRate(a.win_total, a.sum_total)
          : sortColumn === "pick_rate"
          ? calculatePickRate(a.sum_pick_ban, a.sum_bans)
          : sortColumn === "ban_rate"
          ? calculateBanRate(a.sum_bans)
          : sortColumn === "pick_ban_rate"
          ? calculatePickBanRate(a.sum_pick_ban)
          : a[sortColumn];
      const bValue =
        sortColumn === "win_rate"
          ? calculateWinRate(b.win_total, b.sum_total)
          : sortColumn === "pick_rate"
          ? calculatePickRate(b.sum_pick_ban, b.sum_bans)
          : sortColumn === "ban_rate"
          ? calculateBanRate(b.sum_bans)
          : sortColumn === "pick_ban_rate"
          ? calculatePickBanRate(b.sum_pick_ban)
          : b[sortColumn];

      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
  });

  return (
    <AuthProvider>
      <Navbar />
      <div>
        <h1 className="title">
          Postacie Worlds - Ilość rozegranych gier: {totalGames}
        </h1>
        <div className="table_container">
          {champions.length === 0 ? (
            <p className="information">Brak danych w bazie danych</p>
          ) : (
            <table className="champions-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("champion")}>
                    Champion {sortIndicator("champion")}
                  </th>
                  <th onClick={() => handleSort("sum_total")}>
                    Sum Total {sortIndicator("sum_total")}
                  </th>
                  <th onClick={() => handleSort("win_total")}>
                    Win Total {sortIndicator("win_total")}
                  </th>
                  <th onClick={() => handleSort("sum_bans")}>
                    Sum Bans {sortIndicator("sum_bans")}
                  </th>
                  <th onClick={() => handleSort("sum_pick_ban")}>
                    Sum Pick Ban {sortIndicator("sum_pick_ban")}
                  </th>
                  <th onClick={() => handleSort("win_rate")}>
                    Win Rate {sortIndicator("win_rate")}
                  </th>
                  <th onClick={() => handleSort("pick_rate")}>
                    Pick Rate {sortIndicator("pick_rate")}
                  </th>
                  <th onClick={() => handleSort("ban_rate")}>
                    Ban Rate {sortIndicator("ban_rate")}
                  </th>
                  <th onClick={() => handleSort("pick_ban_rate")}>
                    Pick Ban Rate {sortIndicator("pick_ban_rate")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedChampions.map((champion) => (
                  <tr key={champion._id}>
                    <td>{champion.champion}</td>
                    <td>{champion.sum_total}</td>
                    <td>{champion.win_total}</td>
                    <td>{champion.sum_bans}</td>
                    <td>{champion.sum_pick_ban}</td>
                    <td>
                      <span
                        style={{
                          color:
                            calculateWinRate(
                              champion.win_total,
                              champion.sum_total
                            ) >= 51
                              ? "#ff9b00"
                              : "inherit",
                        }}
                      >
                        {calculateWinRate(
                          champion.win_total,
                          champion.sum_total
                        )}
                        %
                      </span>
                    </td>
                    <td>
                      {calculatePickRate(
                        champion.sum_pick_ban,
                        champion.sum_bans
                      )}
                      %
                    </td>
                    <td>{calculateBanRate(champion.sum_bans)}%</td>
                    <td>{calculatePickBanRate(champion.sum_pick_ban)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AuthProvider>
  );
}
