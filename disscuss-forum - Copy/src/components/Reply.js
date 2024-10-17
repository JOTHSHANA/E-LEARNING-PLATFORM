import React, { useState } from 'react';
import { Box, TextField, Button, Paper } from '@mui/material';

const Reply = ({ addReply }) => {
  const [reply, setReply] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reply.trim()) {
      addReply(reply);
      setReply('');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: '20px', maxWidth: '900px', margin: '20px auto' }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <TextField
          label="Type your reply here"
          variant="outlined"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: 'flex-start' }}>
          Submit Reply
        </Button>
      </Box>
    </Paper>
  );
};

export default Reply;
