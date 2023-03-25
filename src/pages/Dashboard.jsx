import { Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EmployeeTable from "../components/EmployeeTable";

function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios
            .get(process.env.REACT_APP_BACKEND_URL + "/employees")
            .then((response) => {
                setEmployees(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    return (
        <Container maxWidth="xl">
            {loading && (
                <Typography
                    sx={{ mt: 2, textAlign: "center" }}
                    variant="h4"
                    component="h1"
                    gutterBottom
                >
                    Loading...
                </Typography>
            )}
            {!loading && (
                <>
                    <Typography
                        sx={{ mt: 2, textAlign: "center" }}
                        variant="h4"
                        component="h1"
                        gutterBottom
                    >
                        Employee Dashboard
                    </Typography>
                    {employees.length !== 0 && (
                        <EmployeeTable employees={employees} />
                    )}
                    {employees.length === 0 && (
                        <Typography textAlign={"center"} variant="h5">
                            No employees added to database yet!
                        </Typography>
                    )}
                </>
            )}
        </Container>
    );
}

export default Dashboard;
