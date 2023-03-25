import {
    AppBar,
    Button,
    CssBaseline,
    Toolbar,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Dashboard from "./pages/Dashboard";
import Update from "./pages/Update";

function App() {
    return (
        <>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            to={"/"}
                            component={Link}
                            sx={{
                                flexGrow: 1,
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            Employee App
                        </Typography>
                        <Button
                            disableElevation
                            disableRipple
                            to={"/create"}
                            component={Link}
                            color="inherit"
                        >
                            Create
                        </Button>
                        <Button
                            disableElevation
                            disableRipple
                            to={"/update"}
                            component={Link}
                            color="inherit"
                        >
                            Update
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/create" element={<Create />} />
                <Route path="/update" element={<Update />} />
                <Route path="*" element={<Navigate to={"/"} replace />} />
            </Routes>
        </>
    );
}

export default App;
