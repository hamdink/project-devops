import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Pagination // Import Pagination
} from '@mui/material';
import { getAllContact, deleteContact, updateContact } from 'src/pages/api/appConfig';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const messagesPerPage = 5; // Number of messages per page
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentContact, setCurrentContact] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    objet: '',
    message: '',
    phone: ''
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getAllContact();
        setMessages(data);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch contacts', error);
      }
    };

    fetchMessages();
  }, []);

  // Calculate the current messages to display based on pagination
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  // Pagination handler
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <h2>Contact List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Objet</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentMessages.map((message) => (
              <TableRow key={message._id}>
                <TableCell>{message.firstName}</TableCell>
                <TableCell>{message.lastName}</TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell>{message.objet}</TableCell>
                <TableCell>{message.message}</TableCell>
                <TableCell>{message.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          count={Math.ceil(messages.length / messagesPerPage)} // Total pages
          page={currentPage} // Current page
          onChange={handlePageChange} // Page change handler
          color='primary'
        />
      </div>
    </div>
  );
};

export default MessageList;
