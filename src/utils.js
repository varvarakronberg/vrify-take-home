import { MARKET_CAP_DESC, MARKET_CAP_ASC, NAMES_AZ, NAMES_ZA } from './App.js'

export function mapRegionName(regionLabel) {
    return regionLabel.replace(/\s/g, '').toLowerCase();
}

export function sortData(data, method) {
    let sortedData;
    switch (method) {
        case MARKET_CAP_ASC:
            sortedData = data.sort((company1, company2) => company1.market_cap - company2.market_cap)
            console.log('sorting by market cap asc');
            break;
        case MARKET_CAP_DESC:
            sortedData = data.sort((company1, company2) => company2.market_cap - company1.market_cap)
            console.log('sorting by market cap desc');
            break;
        case NAMES_AZ:
            sortedData = data.sort((company1, company2) => company1.company_name.toLowerCase() < company2.company_name.toLowerCase() ? -1 : 1)
            console.log('sorting A-Z');
            break;
        case NAMES_ZA:
            sortedData = data.sort((company1, company2) => company1.company_name.toLowerCase() > company2.company_name.toLowerCase() ? -1 : 1)
            console.log('sorting by Z-A');
            break;
        default:
            sortedData = data
            console.log(`default sort - none`);
    }
    return sortedData;
}