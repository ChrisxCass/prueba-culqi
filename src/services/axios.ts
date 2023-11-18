import axios from 'axios';

const culqiApi = axios.create({
    baseURL: 'https://fepruebatecnicaculqi-backend-production.up.railway.app', /* esta url es publica, en caso contrario deberia ser importada desde el .env */
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
      },
    
  });

export default culqiApi;