import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store"; // your vuex store

import Dashboard from "../views/Dashboard.vue";
import UserManagement from "../views/UserManagement.vue";
import TravelManagement from "../views/TravelManagement.vue";
import LostObjectManagement from "../views/LostObjectManagement.vue";
import ExpeditionManagement from "../views/ExpeditionManagement.vue";
import Messagerie from "../views/messagerie.vue";

import login from "../views/login.vue";

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/Messagerie",
    name: "Messagerie",
    component: Messagerie,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/UserManagement",
    name: "UserManagement",
    component: UserManagement,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/TravelManagement",
    name: "TravelManagement",
    component: TravelManagement,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/LostObjectManagement",
    name: "LostObjectManagement",
    component: LostObjectManagement,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/ExpeditionManagement",
    name: "ExpeditionManagement",
    component: ExpeditionManagement,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/login",
    name: "login",
    component: login,
    beforeEnter: ifNotAuthenticated,
    meta: {
      plainLayout: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
