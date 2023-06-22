import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { UpdatePatchTable } from "./UpdatePatchTable";
import "./UpdatePatchNotes.css"; // Import the CSS file
import { Select, MenuItem } from "@mui/material";
import { AuthProvider } from "../../components/AuthContext";
export const UpdatePatchNotes = () => {
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [selectedPatch, setSelectedPatch] = useState("");
  const [filteredChampions, setFilteredChampions] = useState([]);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  const handlePatchSelect = (patch) => {
    setSelectedPatch(patch);
  };

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
  }, []);

  return (
    <AuthProvider>
    <div>
      <Navbar />
      <div className="container-stats">
        <h1>Update Performance</h1>
        <div>
          <label>Character:</label>
          <Select
            value={selectedCharacter}
            onChange={(e) => handleCharacterSelect(e.target.value)}
            label="Select Character"
            variant="outlined"
            autoWidth
            sx={{
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1eff00", // Change outline color to white
              },
            }}
          >
            <MenuItem value="">
              <em>Select Character</em>
            </MenuItem>
            {filteredChampions.map((champion) => (
              <MenuItem key={champion.name} value={champion.name}>
                {champion.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <label>Patch:</label>
          <Select
            value={selectedPatch}
            onChange={(e) => handlePatchSelect(e.target.value)}
            label="Select Patch"
            variant="outlined"
            autoWidth
            inputProps={{ style: { color: "white" } }}
            sx={{
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1eff00", // Change outline color to white
              },
            }}
          >
            <MenuItem value="">
              <em>Select Patch</em>
            </MenuItem>
            {Array.from({ length: 23 }, (_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
        </div>
        {selectedCharacter && selectedPatch && (
          <>
            <h3>
              Changes for {selectedCharacter} in Patch {selectedPatch}
            </h3>
            <div className="container-stats">
              {" "}
              {/* Added the container class */}
              <UpdatePatchTable
                character={selectedCharacter}
                patch={selectedPatch}
              />
            </div>
          </>
        )}
      </div>
    </div>
    </AuthProvider>
  );
};
