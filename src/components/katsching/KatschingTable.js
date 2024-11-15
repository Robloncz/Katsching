import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import './KatschingTable.css';

const KatschingTable = ({ players, isAdmin, toggleKatschingPopup, editKatschingScore, isLoggedIn }) => {
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
            <TableCell className="player-name-cell">Spieler</TableCell>
            <TableCell className="last-katsching-cell">Letzter Katsching</TableCell>
            <TableCell className="katschings-cell">Katschings</TableCell>
            {isAdmin && isLoggedIn && <TableCell className="actions-cell"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player, index) => (
            <TableRow key={index}>
              <TableCell className="player-name-cell">
                {player.name} 
              </TableCell>
              <TableCell className="last-katsching-cell">
                {player.lastKatsching ? formatDate(player.lastKatsching) : "No Katsching yet"}
              </TableCell>
              <TableCell className="katschings-cell">
                <div className="katsching-container">
                  <span className="katsching-counter">{player.katschings}</span>
                  {isLoggedIn && (
                    <IconButton 
                      className="add-katsching-button funny-button" 
                      onClick={() => toggleKatschingPopup(player)}
                      size="small"
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  )}
                </div>
              </TableCell>
              {isAdmin && isLoggedIn && (
                <TableCell className="actions-cell">
                  <IconButton 
                    onClick={() => editKatschingScore(player.id, prompt("New Katsching Score:", player.katschings))}
                    size="small"
                  >
                    <EditIcon fontSize="small" />
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
