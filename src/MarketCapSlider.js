import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


const marks = [
    {
        value: 0,
        label: '$0M',
    },
    {
        value: 20,
        label: '$20M',
    },
    {
        value: 40,
        label: '$40M',
    },
    {
        value: 60,
        label: '$60M',
    },
    {
        value: 80,
        label: '$80M',
    },
    {
        value: 100,
        label: '$100M',
    },
    {
        value: 120,
        label: '$100M+',
    }
];

const minDistance = 20;

function valuetext(value) {
    return `$${value}M`;
}

function valueLabelFormat(value) {
    return marks.find((mark) => mark.value === value).label;
}


export default function MarketCapSlider({ marketCapRange, onMarketCapChange }) {
    const value = marketCapRange;
    const setValue = onMarketCapChange;

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (value[0] !== newValue[0] || value[1] !== newValue[1]) {
            if (activeThumb === 0) {
                setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
            } else {
                setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
            }
        }
    };

    return (
        <Box sx={{ m: 1, width: 220 }}>
            <Slider
                size='large'
                getAriaLabel={() => "Market Cap"}
                defaultValue={[0, 120]}
                value={value}
                onChange={handleChange}
                valueLabelFormat={valueLabelFormat}
                max={120}
                getAriaValueText={valuetext}
                step={null}
                marks={marks}
                disableSwap
            />
        </Box>
    );
}