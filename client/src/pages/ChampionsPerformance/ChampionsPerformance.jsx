import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ChampionsPerformance.css";
import { Navbar } from "../../components/Navbar/Navbar";
export function ChampionsPerformance() {
  const [championSummary, setChampionSummary] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredChampions, setFilteredChampions] = useState([]);

  useEffect(() => {
    async function fetchChampionSummary() {
      try {
        const response = await fetch(
          "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json"
        );
        const data = await response.json();
        setChampionSummary(data);
        setFilteredChampions(data.slice(1));
      } catch (error) {
        console.log("Error fetching champion summary:", error);
      }
    }

    fetchChampionSummary();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = championSummary
      ? championSummary.filter((champion) =>
          champion.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];
    setFilteredChampions(filtered);
  };

  if (!championSummary) {
    return <div>Loading champion summary...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search champion..."
          />
        </div>
        <div className="champion-list">
          {filteredChampions.map((champion) => (
            <Link
              to={`/performance/${champion.name}`}
              className="champion"
              key={champion.id}
            >
              <img
                className="avatar"
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champion.id}.png`}
                alt={champion.name}
              />
              <span className="name">{champion.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
