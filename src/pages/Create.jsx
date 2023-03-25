import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";

function Create() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState("Full-Time");
    const [department, setDepartment] = useState("");
    const [error, setError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState("");
    function handleNameChange(event) {
        setName(event.target.value);
    }
    function handleAgeChange(event) {
        setAge(event.target.value);
    }
    function handleAddressChange(event) {
        setAddress(event.target.value);
    }
    function handleDepartmentChange(event) {
        setDepartment(event.target.value);
    }
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    async function onSubmitHandler(event) {
        event.preventDefault();
        setSubmitSuccess(false);
        if (name.trim().length === 0) {
            setError("Enter Name!!!");
            return;
        }
        if (age.trim().length === 0) {
            setError("Enter Age!!!");
            return;
        }
        if (address.trim().length === 0) {
            setError("Enter Address!!!");
            return;
        }
        if (department.trim().length === 0) {
            setError("Enter Department!!!");
            return;
        }
        if (status.trim().length === 0) {
            setError("Select status!!!");
            return;
        }
        const numericalAge = parseInt(age);
        if (isNaN(numericalAge)) {
            setError("Age should be a nummber!");
            return;
        }
        try {
            const response = await axios.post(
                process.env.REACT_APP_BACKEND_URL + "/create",
                {
                    e_name: name,
                    e_age: numericalAge,
                    e_department: department,
                    e_address: address,
                    e_status: status,
                }
            );
            setSubmitSuccess(response.data.message);
            setError("");
        } catch (err) {
            setError(err.message);
        }
    }
    return (
        <Container maxWidth="xl">
            <Container maxWidth="sm">
                <Typography my={2} textAlign={"center"}>
                    Create Employee
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                    component="form"
                    onSubmit={onSubmitHandler}
                >
                    <TextField
                        margin="normal"
                        label="Employee Name"
                        variant="outlined"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                    <TextField
                        margin="normal"
                        label="Employee Age"
                        variant="outlined"
                        required
                        value={age}
                        type="number"
                        onChange={handleAgeChange}
                    />
                    <TextField
                        margin="normal"
                        label="Employee Address"
                        variant="outlined"
                        required
                        value={address}
                        onChange={handleAddressChange}
                    />
                    <TextField
                        margin="normal"
                        label="Employee Department"
                        variant="outlined"
                        required
                        value={department}
                        onChange={handleDepartmentChange}
                    />

                    <FormControl margin="normal" fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Status"
                            defaultValue={"Full-Time"}
                            required
                            onChange={handleStatusChange}
                        >
                            <MenuItem value={"Full-Time"}>Full-Time</MenuItem>
                            <MenuItem value={"Contract Employee"}>
                                Contract Employee
                            </MenuItem>
                            <MenuItem value={"Remote Location"}>
                                Remote Location
                            </MenuItem>
                        </Select>
                    </FormControl>
                    {error && (
                        <Paper sx={{ backgroundColor: red[400], py: 2, my: 2 }}>
                            <Container>
                                <Typography color={"white"}>{error}</Typography>
                            </Container>
                        </Paper>
                    )}

                    {submitSuccess && (
                        <Paper
                            sx={{ backgroundColor: green[400], py: 2, my: 2 }}
                        >
                            <Container>
                                <Typography color={"white"}>
                                    {submitSuccess}
                                </Typography>
                            </Container>
                        </Paper>
                    )}
                    <Button sx={{ my: 2 }} variant="contained" type="submit">
                        Create
                    </Button>
                </Box>
            </Container>
        </Container>
    );
}

export default Create;
