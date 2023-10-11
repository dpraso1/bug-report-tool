import React from "react";
import { Box, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import { useState, useEffect } from 'react';
import axiosInstance from '../axios-instance';
import { decodeToken } from 'react-jwt';
import CreateBugModal from './CreateBugModal'

const BugDashboard = () => {
    const [bugs, setBugs] = useState([]);
    const [isCreateBugModalOpen, setIsCreatedModalOpen] = useState(false);
    //const [user, serUser] = useState(null);
    const token = localStorage.getItem('token');
    //const { decodedToken: user } = decodeToken(token);
    const user = decodeToken(token);

    const fetchBugs = async () => {
        const result = await axiosInstance.get('/bugs');
        console.log(result)
        if (result?.data.length) {
            setBugs(result.data);
        }
        

    }
    useEffect(() => {
        fetchBugs();
       /* (async () => {
            const result = await axiosInstance.get('/bugs');
            if (result?.data?.lengt) {
                setBugs(result.data);
            }
        })();*/
    }, []);

    return (
        <div> 
            <Box sx={{ backgroundColor: 'black', color: 'red', height: '50px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <BugReportIcon />
                <Typography sx={{ fontSize: '24px' }}> Bug App </Typography>
                <BugReportIcon />
            </Box>
            <Box sx = {{ marginTop: '10px'}}>
                {
                    user.role === 'qa' && 
                    <Button variant='outlined'
                        onClick={() => setIsCreatedModalOpen(true)}>
                        Create Bug
                    </Button>
                }
            </Box>
            <Box sx={{ display: "flex", padding: "20px" }}> {bugs?.map((bug) => (
                <Card key={bug._id} sx={{ maxWidth: "250px" }}>
                    <CardContent>
                        <Typography sx = {{ fontWeight: "bold"}}>
                            Title: {bug.title}
                        </Typography>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Reproduction steps: {bug.steps}
                        </Typography>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Assigned to: {bug.assignedTo}
                        </Typography>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Severity: {bug.severity}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {
                            user.role === 'developer' &&
                            <Button>
                                Finish
                            </Button>
                        }
                    </CardActions>
                </Card>
            ))}
            </Box>
            {isCreateBugModalOpen && (
                <CreateBugModal 
                    open={isCreateBugModalOpen}
                    setIsCreateBugModalOpen={setIsCreatedModalOpen}
                />
            )}
        </div>
    );
};

export default BugDashboard;
