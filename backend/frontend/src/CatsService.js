import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class CatsService {

    // constructor() { }

    async getCats() {
        const url = `${API_URL}/cats/`;
        const response = await axios.get(url);
        return response.data;
    }

}