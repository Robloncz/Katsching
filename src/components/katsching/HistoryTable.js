import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataStore } from 'aws-amplify/datastore';
import { HistoryEntry } from '../../models';
import './HistoryTable.css';

const HistoryTable = ({ isAdmin, refreshTrigger }) => {
  const [history, setHistory] = useState([]);

  const sortHistoryByTime = (history) => {
    return [...history].sort((a, b) => new Date(b.time) - new Date(a.time));
  };

  const fetchHistory = useCallback(async () => {
    try {
      const historyData = await DataStore.query(HistoryEntry);
      setHistory(sortHistoryByTime(historyData));
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory, refreshTrigger]);

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
      setHistory(history.filter(entry => entry.id !== entryId));
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
          {history.map((entry, index) => (
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
