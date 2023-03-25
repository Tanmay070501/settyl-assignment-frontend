import { Box, Fade, Modal, Typography } from "@mui/material";
import React from "react";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function EmployeeModal({ employee, isOpen, onClose }) {
    const { name, address, age, department, status } = employee;
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="employee-modal-title"
            aria-describedby="employee-modal-description"
            closeAfterTransition
        >
            <Fade in={isOpen}>
                <Box sx={style}>
                    <Box width={1} p={2}>
                        <Typography variant="h6" gutterBottom>
                            Employee Details
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Name: {name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Address: {address}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Age: {age}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Department: {department}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Status: {status}
                        </Typography>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

export default EmployeeModal;
