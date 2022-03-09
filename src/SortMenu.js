import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MARKET_CAP_DESC, MARKET_CAP_ASC, NAMES_AZ, NAMES_ZA } from './App.js'


export default function SortMenu({ sortMethod, onSortMethodChange }) {
    const selectedMethod = sortMethod;
    const setMethod = onSortMethodChange;

    const handleChange = (event) => {
        setMethod(event.target.value);
    };
    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 240 }}>
            <InputLabel id="sort">Sort By: </InputLabel>
            <Select
                labelId="simple-select-standard-label"
                id="simple-select-standard"
                value={selectedMethod}
                onChange={handleChange}
                label="Sort By"
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={MARKET_CAP_ASC}>{MARKET_CAP_ASC}</MenuItem>
                <MenuItem value={MARKET_CAP_DESC}>{MARKET_CAP_DESC}</MenuItem>
                <MenuItem value={NAMES_AZ}>{NAMES_AZ}</MenuItem>
                <MenuItem value={NAMES_ZA}>{NAMES_ZA}</MenuItem>
            </Select>
        </FormControl>
    )


}