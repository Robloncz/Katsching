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
    });
  };

  const deleteHistoryEntry = async (entryId) => {
    try {
      await DataStore.delete(HistoryEntry, entryId);
      // After deleting, you might want to refresh the history
      // This could be done by passing a refreshHistory function from AppContent
    } catch (err) {
      console.error("Error deleting history entry:", err);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Uhrzeit</TableCell>
            <TableCell>Event</TableCell>
            <TableCell>Kommentar</TableCell>
            {isAdmin && <TableCell>Aktionen</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {historyEntries.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{formatDate(entry.time)}</TableCell>
              <TableCell>{entry.event}</TableCell>
              <TableCell>{entry.comments}</TableCell>
              {isAdmin && (
                <TableCell>
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
