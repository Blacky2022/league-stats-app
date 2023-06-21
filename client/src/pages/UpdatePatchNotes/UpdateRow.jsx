import React, { useState } from "react";
import { config } from "../../config";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
export const UpdateRow = ({ changes, character, patch }) => {
  const { _id, opis, czy_buff } = changes;
  const [description, setDescription] = useState(opis);
  const [isBuff, setIsBuff] = useState(czy_buff);
  const [isUpdated, setIsUpdated] = useState(false);
  const baseUrl = config.BASE_URL;

  const handleSave = async () => {
    try {
      const response = await fetch(`${baseUrl}/season/changes/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
          isBuff: isBuff,
          name: character,
          selectedPatch: patch,
        }),
      });

      if (!response.ok) {
        throw new Error("Wystąpił błąd podczas zapisywania zmian.");
      }

      const updatedChanges = await response.json();
      console.log("Zapisano zmiany:", updatedChanges);
      setIsUpdated(true); // Ustawienie stanu isUpdated na true po pomyślnym zapisaniu zmian
    } catch (error) {
      console.error("Błąd podczas zapisywania zmian:", error);
    }
  };

  return (
    <tbody>
      <tr>
        <td>Description</td>
        <td>
          <TextField
            className="text"
            id="outlined-basic"
            label="Description"
            variant="outlined"
            multiline
            inputProps={{ style: { color: "white" } }}
            rows={4}
            value={description}
            sx={{ m: 1, width: "25ch" }}
            onChange={(e) => setDescription(e.target.value)}
            focused
          />
        </td>
      </tr>
      <tr>
        <td>Is Buff?</td>
        <td>
          <Checkbox
            defaultChecked
            checked={isBuff}
            onChange={(e) => setIsBuff(e.target.checked)}
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 50 },
              color: "#1eff00",
              "&.Mui-checked": {
                color: "#1eff00",
              },
            }}
          />
        </td>
      </tr>
      <tr>
        <td>Edit</td>
        <td>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          {isUpdated && <span>UPDATED!</span>}
        </td>
      </tr>
    </tbody>
  );
};
