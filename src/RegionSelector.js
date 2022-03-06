
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const REGIONS = [
    'Africa', 'Oceania', 'Europe', 'North America', 'South America', 'Central America', 'Asia'
];

function getStyles(region, selectedRegions, theme) {
    return {
        fontWeight:
            selectedRegions.indexOf(region) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


export default function RegionSelector({ regions, onRegionsChange }) {
    const theme = useTheme();
    //const [selectedRegions, setSelectedRegions] = useState([]);
    const selectedRegions = regions;
    const setSelectedRegions = onRegionsChange;

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedRegions(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <FormControl sx={{ m: 1, width: 220 }}>
            <InputLabel id="demo-multiple-chip-label">Region</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectedRegions}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Region" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {REGIONS.map((region) => (
                    <MenuItem
                        key={region}
                        value={region}
                        style={getStyles(region, selectedRegions, theme)}
                    >
                        {region}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}