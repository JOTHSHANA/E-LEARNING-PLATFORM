import React, { useState } from 'react';
import Reply from './Reply';
import { Box, Typography, Card, CardContent, List, ListItem, Divider, Avatar, Grid, Paper } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

const QuestionDetail = ({ match }) => {
  const questionId = match.params.id;

  // Mock question data
  const question = {
    id: 1,
    title: 'How does React work?',
    body: 'Explain the virtual DOM and how React renders efficiently.',
    author: 'John Doe'
  };

  // Mock replies data
  const initialReplies = [
    { id: 1, body: 'React uses a virtual DOM to minimize updates to the actual DOM.', author: 'Alice' },
    { id: 2, body: 'The virtual DOM compares previous and current states and updates only the changed parts.', author: 'Bob' }
  ];

  const [replies, setReplies] = useState(initialReplies);

  const addReply = (newReply) => {
    setReplies([...replies, { id: replies.length + 1, body: newReply, author: 'Anonymous' }]);
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '900px', margin: 'auto', backgroundColor: '#f5f5f5' }}>
      <Card sx={{ marginBottom: '20px', boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>{question.author[0]}</Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h5" component="div">
                {question.title}
              </Typography>
              <Typography sx={{ marginTop: '10px' }} color="text.secondary">
                {question.body}
              </Typography>
              <Typography sx={{ marginTop: '10px', fontSize: '0.9rem', color: '#888' }}>
                Asked by {question.author}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: '20px', boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>Replies</Typography>
          <List>
            {replies.map((reply) => (
              <React.Fragment key={reply.id}>
                <ListItem alignItems="flex-start">
                  <Grid container spacing={2}>
                    <Grid item>
                      <Avatar sx={{ bgcolor: deepPurple[400] }}>{reply.author[0]}</Avatar>
                    </Grid>
                    <Grid item xs>
                      <Paper elevation={1} sx={{ padding: '10px' }}>
                        <Typography>{reply.body}</Typography>
                        <Typography sx={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
                          — {reply.author}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      <Reply addReply={addReply} />
    </Box>
  );
};

export default QuestionDetail;
