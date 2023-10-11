import { Dialog, DialogTitle, DialogContent, TextField, Stack, DialogActions, Button } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios'

const CreateBugModal = ({ open, setIsCreateBugModalOpen }) => {
    const [title, setTitle] = useState('');
    const [steps, setSteps] = useState('');

    const createBug = () => {
        const bug = {
            title: '111',
            steps: 'def',
            completed: false,
            assigndTo: 'dsdfsdf',
            reportedBy: 'sdfsdf'
        }
    }

    return (
        <Dialog onClose={() => setIsCreateBugModalOpen(false)} open={open} fullWidth>
            <DialogTitle>
                Create Bug
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    <TextField label='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <TextField label='steps' value={steps} onChange={(e) => setSteps(e.target.value)} />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onclick={createBug()}>Create</Button>
                
            </DialogActions>
        </Dialog>
    )
};

export default CreateBugModal;
