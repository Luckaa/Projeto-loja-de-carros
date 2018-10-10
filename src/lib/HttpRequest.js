const API_URL = "http://localhost:5000/";
import axios from 'axios'

export default {

varCarro(carro) {
    return axios.post(API_URL + "carro", carro)
      .then(response => response.data)
  },
  getEstabelecimentoPorId(id) {
    console.log(id);

    return axios.get(API_URL + "estabelecimento/" + id)
      .then(response => response.data)
  }

};
