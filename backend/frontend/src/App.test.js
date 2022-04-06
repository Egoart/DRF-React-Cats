import { render, screen } from '@testing-library/react';
import App from './App';
//import { unmountComponentAtNode } from "react-dom";
//import TestRenderer from 'react-test-renderer';


import CatsService from './CatsService';
import CatsList from './CatsList';

const catsService = new CatsService();

const axios = require('axios');

jest.mock('axios');



const mockedCats = {
  data: [
    {
      id: 1,
      breed: 'Cat Breed 1',
      description: 'Very nice funny cat',
      cat_img: 'https://img-one.jpg'
    },
    {
      id: 2,
      breed: 'Cat Breed 2',
      description: 'Nice funny cat',
      cat_img: 'https://img-two.jpg'
    }
  ]
};

it('returns breed of cat', async () => {
  axios.get.mockResolvedValue(mockedCats);

  const response = await catsService.getCats();
  //console.warn(response)
  expect(response).toHaveLength(2);
});

afterEach(() => {
  jest.resetAllMocks();
});


it('first object has all model fields', async () => {
  axios.get.mockResolvedValue(mockedCats);

  const response = await catsService.getCats();
  //console.warn(response)
  expect(response[0]).toHaveProperty('id');
  expect(response[0]).toHaveProperty('breed');
  expect(response[0]).toHaveProperty('description');
  expect(response[0]).toHaveProperty('cat_img');
});

afterEach(() => {
  jest.resetAllMocks();
});



it('renders element', () => {
  axios.get.mockResolvedValue(mockedCats);
  render(<App />);
  screen.debug();
  const hdElement = screen.getByText(/Hello cat lovers/i);
  expect(hdElement).toBeInTheDocument();
});

afterEach(() => {
  jest.resetAllMocks();
});



it('call get function', () => {
  axios.get.mockResolvedValue(mockedCats);

  const spy = jest.spyOn(catsService, 'getCats');
  catsService.getCats();
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith();
}
);