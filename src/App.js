
import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import RegionSelector from './RegionSelector.js'
import MarketCapSlider, { MAX_CAP_VALUE } from './MarketCapSlider.js';
import SortMenu from './SortMenu.js'
import Company from './Company.js'
import { mapRegionName, sortData } from './utils.js'
import './App.css';

export const MARKET_CAP_ASC = 'Market Cap \u2193';
export const MARKET_CAP_DESC = 'Market Cap \u2191';
export const NAMES_AZ = 'A\u2192Z';
export const NAMES_ZA = 'Z\u2190A';
// import { MARKET_CAP_DESC, MARKET_CAP_ASC, REGIONS_AZ, REGIONS_ZA, SortMenu } from './SortMenu.js'

function App() {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [marketCapRange, setMarketCapRange] = useState([0, MAX_CAP_VALUE]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [companiesCounter, setCompaniesCounter] = useState(0);
  const [tabMenuValue, setTabMenuValue] = useState('1');
  const [searchTarget, setSearchTarget] = useState('')
  const [sortMethod, setSortMethod] = useState('');

  const ITEMS_PER_PAGE = 8;

  const getData = () => {
    fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    ).then((response) => {
      return response.json();
    }).then((myJson) => {
      setData(myJson);
    });
  }
  useEffect(() => {
    getData()
  }, [])



  useEffect(() => {
    let minCap = marketCapRange[0];
    let maxCap = marketCapRange[1] === MAX_CAP_VALUE ? Number.MAX_SAFE_INTEGER : marketCapRange[1];
    const filteredMarketCap = data.filter(company => { return company.market_cap >= minCap && company.market_cap <= maxCap });
    const filteredRegions = filteredMarketCap.filter(company => { return regions.length === 0 || regions.map(mapRegionName).includes(company.region) })
    const filteredSearch = filteredRegions.filter(company => {
      let name = company.company_name.toLowerCase()
      return name.startsWith(searchTarget.toLowerCase())
    });
    const sortedFilteredData = sortData(filteredSearch, sortMethod);

    setFilteredData(sortedFilteredData);
  }, [data, regions, marketCapRange, searchTarget, sortMethod]);

  useEffect(() => {
    const firstElement = (currentPage - 1) * ITEMS_PER_PAGE;
    const lastElement = currentPage * ITEMS_PER_PAGE;
    setCurrentPageData(filteredData.slice(firstElement, lastElement));
    setCompaniesCounter(filteredData.length);
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

  const handleTabMenuChange = (event, newValue) => {
    setTabMenuValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTarget(event.target.value);
    // console.log(event.target.value)

  };
  const handleResetFilters = () => {
    setRegions([]);
    setMarketCapRange([0, MAX_CAP_VALUE]);
    setSortMethod('');
    setSearchTarget('');
  }

  const handleSortMethodChange = (newValue) => {
    setSortMethod(newValue);
  }

  //FIX GRID for responsive columns
  return (
    <Box sx={{ flexGrow: 1, m: 5 }}>
      <Grid container spacing={2} justify="space-between" >
        <Grid item xs={4} container
          direction="column"
          alignItems="flex-start"
          justify="flex-end">
          <Typography variant="h2" component="div">
            Discover
          </Typography>
        </Grid>
        <Grid item xs={8} container direction="column" alignItems="flex-end" justify="flex-end">
          <TextField
            id="outlined-name"
            label="Search"
            value={searchTarget}
            onChange={handleSearchChange}
          />
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1, m: 5 }}>
        <Grid container columns={{ xs: 1, sm: 1, md: 8, lg: 8 }} align="center" justify="center" >
          <Grid item xs={1} sm={3} md={3}>
            <Container>
              <Box><Typography variant="h6" component="span">
                Filters
              </Typography>
                <Button size="small" onClick={handleResetFilters}>Reset</Button></Box>
              <RegionSelector regions={regions} onRegionsChange={handleRegionsChange} />
              <MarketCapSlider marketCapRange={marketCapRange} onMarketCapChange={handleMarketCapChange} />
            </Container>
          </Grid>
          <Grid item xs={1} sm={1} md={5} lg={5}>
            <Box>
              <TabContext value={tabMenuValue} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleTabMenuChange} centered aria-label="tab menu">
                    <Tab label="Decks" value="0" />
                    <Tab label={`Companies (${companiesCounter})`} value="1" />
                    <Tab label="Projects" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="0">Decks</TabPanel>
                <TabPanel value="1">
                  {currentPageData && currentPageData.length > 0 ?
                    <div>
                      <SortMenu sortMethod={sortMethod} onSortMethodChange={handleSortMethodChange} />
                      <Grid container spacing={2} columns={{ xs: 1, sm: 1, md: 2, lg: 3 }} align="center" justify="center" data-testid="company-list">
                        {currentPageData.map(company => {
                          return <Grid key={company.id} item xs={1} sm={1} md={1} lg={1}>
                            <Company imageUrl={company.image_url} name={company.company_name} region={company.region} cap={company.market_cap} />
                          </Grid>
                        })}
                      </Grid>
                      <Box sx={{ m: 4, width: 'auto' }} >
                        <Pagination count={numberOfPages} page={currentPage} onChange={handlePageChange} data-testid="pagination" />
                      </Box>
                    </div>
                    : <Typography>No matches found</Typography>}
                </TabPanel>
                <TabPanel value="2">Projects</TabPanel>
              </TabContext>

            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box >
  );
}


export default App;
