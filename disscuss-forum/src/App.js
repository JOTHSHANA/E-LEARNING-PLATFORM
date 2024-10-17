import React from 'react';
import { Container, Typography } from '@mui/material';
import DiscussionList from './components/DiscussionList';
import PostQuestion from './components/PostQuestion';

function App() {
  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography variant="h3" align="center" gutterBottom style={{ color: '#3f51b5' }}>
        TechLehren Discussion Forum
      </Typography>
      <PostQuestion />
      <DiscussionList />
    </Container>
  );
}

export default App;
