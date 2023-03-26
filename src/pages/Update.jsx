import {
    Button,
    Container,
    Divider,
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
import SearchAutocomplete from "../components/SearchAutoComplete";

function Update() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState("Full-Time");
    const [department, setDepartment] = useState("");
    const [error, setError] = useState("");
    const [updateError, setUpdateError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState("");
    const [found, setFound] = useState(false);
    const [id, setId] = useState("");
    function handleIdChange(event) {
        setId(event.target.value);
    }
    function handleNameChange(event) {
        setName(event.target.value);
    }
    function handleAgeChange(event) {
        setAge(event.target.value);
    }
    // function handleAddressChange(event) {
    //     setAddress(event.target.value);
    // }
    function handleDepartmentChange(event) {
        setDepartment(event.target.value);
    }
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };
    async function onFindSubmitHandler(event) {
        event.preventDefault();
        setFound(false);
        if (id.trim().length === 0) {
            setError("Enter Employee Id");
            return;
        }
        try {
            const response = await axios.get(
                process.env.REACT_APP_BACKEND_URL + "/employees/" + id
            );
            const employee = response.data;
            setError("");
            setFound(true);
            setName(employee.name);
            setAddress(employee.address);
            setAge(employee.age);
            setDepartment(employee.department);
            setStatus(employee.status);
        } catch (err) {
            //console.log(err);
            setError("Employee with that ID not found");
            setFound(false);
        }
    }
    async function onSubmitHandler(event) {
        event.preventDefault();
        setSubmitSuccess(false);
        if (name.trim().length === 0) {
            setUpdateError("Enter Name!!!");
            return;
        }
        if (age.trim().length === 0) {
            setUpdateError("Enter Age!!!");
            return;
        }
        if (!address) {
            setUpdateError("Enter Address!!!");
            return;
        }
        if (department.trim().length === 0) {
            setUpdateError("Enter Department!!!");
            return;
        }
        if (status.trim().length === 0) {
            setUpdateError("Select status!!!");
            return;
        }
        const numericalAge = parseInt(age);
        if (isNaN(numericalAge)) {
            setUpdateError("Age should be a nummber!");
            return;
        }
        try {
            const response = await axios.post(
                process.env.REACT_APP_BACKEND_URL + "/update",
                {
                    e_id: id,
                    e_name: name,
                    e_age: numericalAge,
                    e_department: department,
                    e_address: address.label,
                    e_status: status,
                    lat: address.lat,
                    long: address.long,
                }
            );
            setSubmitSuccess(response.data.message);
            setUpdateError("");
        } catch (err) {
            //console.log(err.message);
            setUpdateError(err.message);
        }
    }
    return (
        <Container maxWidth="xl">
            <Container maxWidth="sm">
                <Typography my={2} textAlign={"center"}>
                    Update Employee
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                    component="form"
                    onSubmit={onFindSubmitHandler}
                >
                    <TextField
                        label="Employee Id"
                        variant="outlined"
                        value={id}
                        onChange={handleIdChange}
                        required
                    />
                    {error && (
                        <Paper
                            sx={{
                                backgroundColor: red[400],
                                py: 2,
                                my: 2,
                            }}
                        >
                            <Container>
                                <Typography color={"white"}>{error}</Typography>
                            </Container>
                        </Paper>
                    )}
                    <Button type="submit" variant="outlined" sx={{ mt: 2 }}>
                        Find Employee
                    </Button>
                </Box>
                {found && (
                    <>
                        <Divider sx={{ my: 4 }} />
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
                            {
                                //<TextField
                                //     margin="normal"
                                //     label="Employee Address"
                                //     variant="outlined"
                                //     required
                                //     value={address}
                                //     onChange={handleAddressChange}
                                // />
                            }
                            <SearchAutocomplete
                                value={address}
                                setValue={setAddress}
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
                                    <MenuItem value={"Full-Time"}>
                                        Full-Time
                                    </MenuItem>
                                    <MenuItem value={"Contract Employee"}>
                                        Contract Employee
                                    </MenuItem>
                                    <MenuItem value={"Remote Location"}>
                                        Remote Location
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            {updateError && (
                                <Paper
                                    sx={{
                                        backgroundColor: red[400],
                                        py: 2,
                                        my: 2,
                                    }}
                                >
                                    <Container>
                                        <Typography color={"white"}>
                                            {updateError}
                                        </Typography>
                                    </Container>
                                </Paper>
                            )}

                            {submitSuccess && (
                                <Paper
                                    sx={{
                                        backgroundColor: green[400],
                                        py: 2,
                                        my: 2,
                                    }}
                                >
                                    <Container>
                                        <Typography color={"white"}>
                                            {submitSuccess}
                                        </Typography>
                                    </Container>
                                </Paper>
                            )}
                            <Button
                                sx={{ my: 2 }}
                                variant="contained"
                                type="submit"
                            >
                                Update
                            </Button>
                        </Box>
                    </>
                )}
            </Container>
        </Container>
    );
}

export default Update;
