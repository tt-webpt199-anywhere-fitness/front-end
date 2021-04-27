import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token')
  return axios.create({
    headers: {
      Authorization: token
    },
    baseURL: 'https://anywhere-fitness-wpt199-be.herokuapp.com/api',
  })
}

export default axiosWithAuth
