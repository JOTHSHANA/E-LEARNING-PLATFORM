import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const mockDiscussions = [
  {
    id: 1,
    title: 'How to integrate React with MUI?',
    description: 'I need help integrating MUI with my React project. Any suggestions?',
    replies: 3,
  },
  {
    id: 2,
    title: 'Best practices for state management in React?',
    description: 'What are the best practices for managing state efficiently?',
    replies: 5,
  },
];

const DiscussionList = () => {
  return (
    <Box>
      {mockDiscussions.map((discussion) => (
        <Card key={discussion.id} style={{ margin: '20px 0' }}>
          <CardContent>
            <Typography variant="h6" style={{ color: '#3f51b5' }}>
              {discussion.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {discussion.description}
            </Typography>
            <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
              View Discussion ({discussion.replies} replies)
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default DiscussionList;
