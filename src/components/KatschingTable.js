import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import './KatschingTable.css';

const KatschingTable = ({ players, isAdmin, formatDate, toggleKatschingPopup, editKatschingScore }) => {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader style={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontFamily: 'Irish Grover' }}>Spieler</TableCell>
            <TableCell style={{width: "50%", fontFamily: 'Irish Grover' }}>Letzter Katsching</TableCell>
            <TableCell style={{ fontFamily: 'Irish Grover' }}>Katschings</TableCell>
            {isAdmin && <TableCell style={{ width: "10%", fontFamily: 'Irish Grover' }}>Aktionen</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player, index) => (
            <TableRow key={index}>
              <TableCell style={{ fontFamily: 'Montserrat' }}>{player.name}</TableCell>
              <TableCell style={{ fontFamily: 'Montserrat' }}>
                {player.lastKatsching ? formatDate(player.lastKatsching) : "No Katsching yet"}
              </TableCell>
              <TableCell style={{ fontFamily: 'Montserrat' }}>
                <div className="katsching-container">
                  <div className="katsching-counter">{player.katschings}</div>
                  <Button className="add-katsching-button" onClick={() => toggleKatschingPopup(player)}>+</Button>
                </div>
              </TableCell>
              {isAdmin && (
                <TableCell style={{ fontFamily: 'Montserrat' }}>
                  <Button onClick={() => editKatschingScore(player.id, prompt("New Katsching Score:", player.katschings))}>Edit</Button>
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