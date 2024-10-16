import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './KatschingTable.css';

const KatschingTable = ({ players, isAdmin, toggleKatschingPopup, editKatschingScore }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Spieler</TableCell>
            <TableCell className="last-katsching-cell">Letzter Katsching</TableCell>
            <TableCell>Katschings</TableCell>
            {isAdmin && <TableCell className="actions-cell">Aktionen</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player, index) => (
            <TableRow key={index}>
              <TableCell className="player-name-cell">{player.name}</TableCell>
              <TableCell>
                {player.lastKatsching ? formatDate(player.lastKatsching) : "No Katsching yet"}
              </TableCell>
              <TableCell>
                <div className="katsching-container">
                  <div className="katsching-counter">{player.katschings}</div>
                  <IconButton 
                    className="add-katsching-button funny-button" 
                    onClick={() => toggleKatschingPopup(player)}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </div>
              </TableCell>
              {isAdmin && (
                <TableCell>
                  <IconButton onClick={() => editKatschingScore(player.id, prompt("New Katsching Score:", player.katschings))}>
                    Edit
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default KatschingTable;
