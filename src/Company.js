import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';

export const regionsMap = {
    'africa': 'Africa',
    'oceania': 'Oceania',
    'europe': 'Europe',
    'northamerica': 'North America',
    'southamerica': 'South America',
    'centralamerica': 'Central America',
    'asia': "Asia",
}

export default function Company({ imageUrl, name, region, cap }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="company image"
                height="140"
                image={imageUrl}
            />
            <CardContent align="left">
                <Typography gutterBottom variant="h5" component="div" >
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Market Cap: {+cap.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Region: {regionsMap[region]}
                </Typography>
            </CardContent>
        </Card>
    )
}