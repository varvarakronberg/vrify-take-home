const express = require('express')
const cors = require('cors');
const app = express()
const port = 5000;

const fs = require('fs');

const corsOptions = {
    'origin': ['http://localhost:3000'],
    'methods': ['GET']
};
app.use(cors(corsOptions));


app.get('/data', (req, res) => {
    let minMarketCap = req.query.minMarketCap ?? 0;
    let rawdata = fs.readFileSync('data.json');
    let companies = JSON.parse(rawdata);
    companies = companies.filter(c => c.market_cap >= minMarketCap);
    res.send(companies);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})