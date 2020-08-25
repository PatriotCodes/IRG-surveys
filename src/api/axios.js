import axios from 'axios';
import { baseURL } from '../constants';

export default axios.create({
  baseURL: baseURL,
  timeout: 5000,
});
