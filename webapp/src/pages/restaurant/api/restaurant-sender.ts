import axios from 'axios';

import { API_BASE_URL } from '../../../constants';

const restaurantSender = axios.create({
  baseURL: `${API_BASE_URL}/restaurants`,
});

export default restaurantSender;
