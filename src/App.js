
import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import RegionSelector from './RegionSelector.js'
import MarketCapSlider from './MarketCapSlider.js'
import Company from './Company.js'
import './App.css';

const mapRegionName = (regionLabel) => {
  return regionLabel.replace(/\s/g, '').toLowerCase();
}

function App() {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [marketCapRange, setMarketCapRange] = useState([0, 120]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);

  const ITEMS_PER_PAGE = 8;

  const getData = () => {
    fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    ).then((response) => {
      console.log(response)
      return response.json();
    }).then((myJson) => {
      console.log(myJson);
      setData(myJson);

    });
  }
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    let minCap = marketCapRange[0];
    let maxCap = marketCapRange[1] === 120 ? Number.MAX_SAFE_INTEGER : marketCapRange[1];
    const filteredMarketCap = data.filter(company => { return company.market_cap >= minCap && company.market_cap <= maxCap });
    const filteredRegions = filteredMarketCap.filter(company => { return regions.length === 0 || regions.map(mapRegionName).includes(company.region) })
    setFilteredData(filteredRegions);
  }, [data, regions, marketCapRange]);

  useEffect(() => {
    const firstElement = (currentPage - 1) * ITEMS_PER_PAGE;
    const lastElement = currentPage * ITEMS_PER_PAGE;
    setCurrentPageData(filteredData.slice(firstElement, lastElement));

  }, [filteredData, currentPage]);

  useEffect(() => {
    setNumberOfPages(Math.ceil(filteredData.length / ITEMS_PER_PAGE));
    setCurrentPage(1);
  }, [filteredData]);

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

  const handleRegionsChange = (selectedRegions) => {
    setRegions(selectedRegions);
  }

  const handleMarketCapChange = (newRange) => {
    setMarketCapRange(newRange);
  }

  return (

    <Box sx={{ flexGrow: 1, m: 5 }} >
      <Grid container columns={{ xs: 1, sm: 1, md: 8, lg: 8 }} align="center" justify="center" >
        <Grid item xs={1} sm={3} md={3}>
          <Container>
            <RegionSelector regions={regions} onRegionsChange={handleRegionsChange} />
            <MarketCapSlider marketCapRange={marketCapRange} onMarketCapChange={handleMarketCapChange} />
          </Container>
        </Grid>
        <Grid item xs={1} sm={1} md={5} lg={5}>
          <Box>
            <Grid container spacing={2} columns={{ xs: 1, sm: 1, md: 2, lg: 3 }} align="center" justify="center" >
              {currentPageData && currentPageData.length > 0 && currentPageData.map(company => {
                return <Grid key={company.id} item xs={1} sm={1} md={1} lg={1}>
                  <Company imageUrl={company.image_url} name={company.company_name} region={company.region} cap={company.market_cap} />
                </Grid>
              })}
            </Grid>
          </Box>
          <Box sx={{ m: 4, width: 'auto' }} ><Pagination count={numberOfPages} page={currentPage} onChange={handlePageChange} /></Box>
        </Grid>
      </Grid>
    </Box>
  );
}



export default App;
