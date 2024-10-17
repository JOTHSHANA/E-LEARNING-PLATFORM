import React from 'react';
import {
    Dialog,
    DialogTitle,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button,
} from '@mui/material';

function TopicSelection({ open, onClose, topics, onSelect }) {
    const [selectedTopic, setSelectedTopic] = React.useState('');

    const handleSelectChange = (event) => {
        setSelectedTopic(event.target.value);
    };

    const handleSubmit = () => {
        onSelect(selectedTopic); // Pass the selected topic ID to the parent component
        onClose(); // Close the dialog
    };

    return (
        <Dialog sx={{ borderRadius: "10px" }} fullWidth onClose={onClose} open={open}>
            <div style={{ backgroundColor: "var(--background-1)" }}>
                <DialogTitle sx={{ color: "var(--text)" }}>Select a Topic</DialogTitle>
                <FormControl fullWidth sx={{ p: 2 }}>
                    <InputLabel id="topic-select-label">Topics</InputLabel>
                    <Select
                        sx={{border:"1px solid #1e92e0", color:"var(--text)"}}
                        labelId="topic-select-label"
                        value={selectedTopic}
                        onChange={handleSelectChange}
                    >
                        {topics.map((topic) => (
                            <MenuItem key={topic.id} value={topic.id}>
                                {topic.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ mt: 2 }}
                    >
                        Select
                    </Button>
                </FormControl>
            </div>
        </Dialog>
    );
}

export default TopicSelection;
