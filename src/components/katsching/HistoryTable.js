import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataStore } from 'aws-amplify/datastore';
import { HistoryEntry } from '../../models';
import './HistoryTable.css';

const HistoryTable = ({ isAdmin, historyEntries }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    }).replace(',', '');  // Remove comma between date and time
  };

  const deleteHistoryEntry = async (entryId) => {
    try {
      await DataStore.delete(HistoryEntry, entryId);
    } catch (err) {
      console.error("Error deleting history entry:", err);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell className="time-cell">Uhrzeit</TableCell>
            <TableCell className="event-cell">Event</TableCell>
            <TableCell className="comment-cell">Kommentar</TableCell>
            {isAdmin && <TableCell className="actions-cell"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {historyEntries.map((entry, index) => (
            <TableRow key={index}>
              <TableCell className="time-cell">
                <div className="time-wrapper">{formatDate(entry.time)}</div>
              </TableCell>
              <TableCell className="event-cell">
                <div className="text-wrapper">{entry.event}</div>
              </TableCell>
              <TableCell className="comment-cell">
                <div className="text-wrapper">{entry.comments}</div>
              </TableCell>
              {isAdmin && (
                <TableCell className="actions-cell">
                  <IconButton onClick={() => deleteHistoryEntry(entry.id)} className="delete-button">
                    <DeleteIcon />
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

export default HistoryTable;
