import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

describe('testing object from API', function () {

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

})

describe('testing top block element', function () {

  it('renders invitation test', () => {
    axios.get.mockResolvedValue(mockedCats);
    render(<App />);
    // screen.debug();
    const hdElement = screen.getByText(/Hello cat lovers/i);
    expect(hdElement).toBeInTheDocument();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

})

describe('testing API calls', function () {

  it('function to get cats from API is working', () => {
    axios.get.mockResolvedValue(mockedCats);

    const spy = jest.spyOn(catsService, 'getCats');
    catsService.getCats();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  }
  );

  afterEach(() => {
    jest.resetAllMocks();
  });

})

describe('testin input for search and info tooltip', function () {

  it('info text for search is invisible after rendering page', () => {
    axios.get.mockResolvedValue(mockedCats);

    render(<App />)
    const searchAppearedElement = screen.getByText(/Type breed of/i)
    expect(searchAppearedElement).toHaveStyle("visibility: hidden")
  })

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('info text for search is visible on mouse over', () => {
    axios.get.mockResolvedValue(mockedCats);

    render(<App />)
    const searchInfoElement = screen.getByRole("input-info", { hidden: true })
    const searchAppearedElement = screen.getByText(/Type breed of/i)
    fireEvent.mouseOver(searchInfoElement)
    expect(searchAppearedElement).toHaveStyle("visibility: visible")
  })


  it('input for search is in DOM and is active', () => {
    axios.get.mockResolvedValue(mockedCats);
    render(<App />)
    const searchElement = screen.getByPlaceholderText(/find a cat/i)
    fireEvent.change(searchElement, { target: { value: "best cat" } })
    expect(searchElement).toBeInTheDocument();
    expect(searchElement.value).toBe("best cat");
  })

})