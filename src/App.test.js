import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for toBeInTheDocument
import fetchMock from "jest-fetch-mock";
import { act } from 'react-dom/test-utils';
import App from './App';
import ReactDOM from 'react-dom';


fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks()
})

test('company from the json response is rendered on the screen', async () => {
  fetch.mockResponse(JSON.stringify([
    {
      "id": "4c208f7f-241f-4f44-870b-b78fc6419452",
      "company_name": "Jatri",
      "market_cap": 55.2416,
      "region": "northamerica",
      "image_url": "http://dummyimage.com/566x347.png/dddddd/000000"
    }]));

  await act(async () => { render(<App />) });

  const company_name = screen.getByText("Jatri");
  expect(company_name).toBeInTheDocument();

  // const market_cap = screen.getByText("55.2416");
  // expect(market_cap).toBeInTheDocument();

  // const region = screen.getByText("northamerica");
  // expect(region).toBeInTheDocument();
});

test('App component renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});