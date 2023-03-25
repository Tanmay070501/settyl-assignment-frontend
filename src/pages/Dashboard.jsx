import { Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EmployeeTable from "../components/EmployeeTable";

function Dashboard() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_BACKEND_URL + "/employees")
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" component="h1" gutterBottom>
                Employee Dashboard
            </Typography>
            <EmployeeTable employees={employees} />
        </Container>
    );
}

export default Dashboard;
