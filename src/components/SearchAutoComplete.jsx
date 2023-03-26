import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const SearchAutocomplete = ({ value, setValue }) => {
    const [options, setOptions] = useState([]);

    const fetchOptions = async (searchQuery) => {
        // Call your API here with the search query and set the options state based on the API response
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${searchQuery}`
        );
        const data = await response.json();
        console.log(data);
        setOptions(
            data.map((e) => {
                return {
                    label: e.display_name,
                    lat: e.lat,
                    long: e.lon,
                };
            })
        );
        //setOptions(data.results);
    };

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            value={value}
            onChange={(event, newValue) => {
                //console.log(newValue);
                setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                fetchOptions(newInputValue);
            }}
            isOptionEqualToValue={(option, value) =>
                option.label === value.label
            }
            sx={{ width: "100%" }}
            renderInput={(params) => (
                <TextField margin="normal" {...params} label="Address" />
            )}
        />
    );
};

export default SearchAutocomplete;
