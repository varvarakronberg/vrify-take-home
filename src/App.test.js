import { cleanup, fireEvent, waitFor, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom'; // for toBeInTheDocument
import fetchMock from "jest-fetch-mock";
import { act } from 'react-dom/test-utils';
import App from './App';
import ReactDOM from 'react-dom';
import { regionsMap } from './Company.js'

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks()
})

// test('company from the json response is rendered on the screen', async () => {
//   fetch.mockResponse(JSON.stringify([
//     {
//       "id": "4c208f7f-241f-4f44-870b-b78fc6419452",
//       "company_name": "Jatri",
//       "market_cap": 55.2416,
//       "region": "northamerica",
//       "image_url": "http://dummyimage.com/566x347.png/dddddd/000000"
//     }]));

//   await act(async () => { render(<App />) });

//   const company_name = screen.getByText("Jatri");
//   expect(company_name).toBeInTheDocument();
// });



// test('App component renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });


// test('pagination works', async () => {
//   let i = 0;
//   fetch.mockResponseOnce(`[{
//     "id": "4c208f7f-241f-4f44-870b-b78fc6419452",
//     "company_name": "Jatri",
//     "market_cap": 55.2416,
//     "region": "northamerica",
//     "image_url": "http://dummyimage.com/566x347.png/dddddd/000000"
//   },
//   {
//     "id": "8c44beec-8850-4054-86aa-eae652db1e17",
//     "company_name": "Mita",
//     "market_cap": 53.6275,
//     "region": "oceania",
//     "image_url": "http://dummyimage.com/797x330.png/dddddd/000000"
//   },
//   {
//     "id": "f36f2992-56ec-4a14-8e90-08697869cad8",
//     "company_name": "Brainbox",
//     "market_cap": 57.2893,
//     "region": "northamerica",
//     "image_url": "http://dummyimage.com/410x215.png/dddddd/000000"
//   },
//   {
//     "id": "6b908399-7bef-4e64-8167-57c788247638",
//     "company_name": "Devify",
//     "market_cap": 7.3237,
//     "region": "europe",
//     "image_url": "http://dummyimage.com/446x305.png/5fa2dd/ffffff"
//   },
//   {
//     "id": "f18adb32-3861-4bd7-8fda-166639f315e1",
//     "company_name": "Thoughtsphere",
//     "market_cap": 55.4024,
//     "region": "oceania",
//     "image_url": "http://dummyimage.com/579x214.png/5fa2dd/ffffff"
//   },
//   {
//     "id": "0abc1bf0-343b-4416-ada0-b9770cf93ea6",
//     "company_name": "Bubbletube",
//     "market_cap": 93.2255,
//     "region": "asia",
//     "image_url": "http://dummyimage.com/415x261.png/dddddd/000000"
//   },
//   {
//     "id": "fb358b84-7413-4501-b99b-796dd00a3706",
//     "company_name": "Jetwire",
//     "market_cap": 3.0736,
//     "region": "asia",
//     "image_url": "http://dummyimage.com/569x383.png/cc0000/ffffff"
//   },
//   {
//     "id": "a7fba000-57d3-43fc-8828-9b1aa0a83182",
//     "company_name": "Linkbuzz",
//     "market_cap": 89.4858,
//     "region": "europe",
//     "image_url": "http://dummyimage.com/738x319.png/ff4444/ffffff"
//   },
//   {
//     "id": "cea9a7d5-0b9a-418a-8b85-056ecc606f7a",
//     "company_name": "Blogpad",
//     "market_cap": 107.1206,
//     "region": "europe",
//     "image_url": "http://dummyimage.com/528x306.png/cc0000/ffffff"
//   },
//   {
//     "id": "47eda831-a2a5-411b-8365-5e3d2c9d0902",
//     "company_name": "Browsebug",
//     "market_cap": 73.2224,
//     "region": "africa",
//     "image_url": "http://dummyimage.com/783x294.png/cc0000/ffffff"
//   }]`);
//   let container = null;
//   await act(async () => { ({ container } = render(<App />)) });
//   const page2Button = container.querySelector('[aria-label="page 2"]');

//   console.log("NUMBER OF PAGINATION BUTTONS", page2Button);

//   // fireEvent.click(screen.getByTestId('pagination'));
//   // await waitFor(() => screen.findByTestId('company-list'));
//   // const companyList = screen.findByTestId('company-list');
//   // console.log("number of companies", within(companyList).queryAllByRole('li').length);
//   expect(1).toEqual(1);
// });