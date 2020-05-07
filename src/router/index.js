import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cadastro from "../views/Cadastro.vue";
import Servicos from "../views/Servicos.vue";
import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Home,
  },
  {
    path: "/cadastroUsuario",
    name: "CadastroUsuario",
    component: Cadastro,
  },
  {
    path: "/listaServicos",
    name: "ListaServicos",
    component: Servicos,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)){
    if (store.getters.isLogado) next();
    else next()
  }
  else{
    next()
  }
});

export default router;
