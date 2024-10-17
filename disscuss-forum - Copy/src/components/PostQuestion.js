import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const PostQuestion = () => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Question submitted: ' + question);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
      <TextField
        label="Post a new question"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default PostQuestion;
