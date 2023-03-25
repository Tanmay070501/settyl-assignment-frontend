import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React, { useState } from "react";
import EmployeeModal from "./EmployeeModal";

const EmployeeTable = ({ employees }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState({});

    const handleModalOpen = (employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedEmployee({});
        setIsModalOpen(false);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ textAlign: "center" }}>
                                Employee Id
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                Employee Name
                            </TableCell>

                            <TableCell sx={{ textAlign: "center" }}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee._id}>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {employee._id}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {employee.name}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Button
                                        onClick={() =>
                                            handleModalOpen(employee)
                                        }
                                        variant="outlined"
                                        color="primary"
                                    >
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <EmployeeModal
                isOpen={isModalOpen}
                employee={selectedEmployee}
                onClose={handleModalClose}
            />
        </>
    );
};
export default EmployeeTable;
