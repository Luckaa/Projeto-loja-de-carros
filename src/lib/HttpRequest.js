const API_URL = "http://localhost:5000/";
import axios from 'axios'

export default {

  getProdutos() {
    return fetch(API_URL + "produtos")
      .then(response => response.json())
  },
  getEstabelecimentos() {
    return fetch(API_URL + "estabelecimento")
      .then(response => response.json())
  },
  salvarCarro(carro) {
    return axios.post(API_URL + "carro", carro)
      .then(response => response.data)
  },
  getUsuario(usuario) {
    return axios.post(API_URL + "autenticar", usuario)
      .then(response => response.data)
  },

  getEstabelecimentoPorId(id) {
    console.log(id);

    return axios.get(API_URL + "estabelecimento/" + id)
      .then(response => response.data)
  }

};
