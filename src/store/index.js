import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: {},
    logado: false,
    servicos: {},
    fila: {},
    primeiroAcesso: true
  },
  mutations: {
    auth_success(state, usuario) {
      state.usuario = usuario;
      state.logado = true;
    },
    servicos_success(state, servicos) {
      state.servicos = servicos;
    },
    fila_success(state, fila) {
      state.fila = fila;
    },
    servico_success(state) {
      state.logado = true;
    },
    primeiroAcesso(state) {
      if (state.primeiroAcesso == true)
        state.primeiroAcesso = false;
      else
        state.primeiroAcesso = true;
    },
  },
  actions: {
    login({ commit }, usuario) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:57414/api/Usuario/Logar",
          data: usuario,
          method: "POST",
        })
          .then((response) => {
            const user = response.data;
            commit("auth_success", user);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    cadastrar({ commit }, usuario) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:57414/api/Usuario/Cadastrar",
          data: usuario,
          method: "POST",
        })
          .then((response) => {
            const usuario = response.data.usuario;
            commit("auth_success", usuario);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getServicos({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:57414/api/servico",
          method: "GET",
        })
          .then((response) => {
            const servicos = response.data;
            commit("servicos_success", servicos);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getFila({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://virtserver.swaggerhub.com/finch/avaliacao/1.0.0/fila",
          method: "GET",
        })
          .then((response) => {
            commit("fila_success", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setServico({ commit }, item_servico) {
      commit("");
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:57414/api/servico",
          method: "POST",
          data: item_servico,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    atualizarPrimeiroAcesso({ commit }) {
      return new Promise((resolve) => {
        commit("primeiroAcesso");
        resolve();
      });
    },
  },
  getters: {
    isLogado: (state) => state.logado,
    idUsuarioLogado: (state) => state.usuario[0].ID_Usuario,
    nomeUsuarioLogado: (state) => state.usuario[0].Nome,
    primeiraVez: (state) => state.primeiroAcesso
  },
  strict: process.env.NODE_ENV !== "production",
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
