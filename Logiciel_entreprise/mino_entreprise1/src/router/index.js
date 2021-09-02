import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import Dashboard from "../views/Dashboard.vue";
import TravelDeclaration from "../views/TravelDeclaration.vue";
import TravelBalanceSheet from "../views/TravelBalanceSheet.vue";
import TravelLuggage from "../views/TravelLuggageSheet.vue";
import lostObjectList from "../views/lostObjectList.vue";
import TravelStat from "../views/travelStat.vue";
import Livreurs from "../views/Expedition1Management.vue";
import ExpeditionSheet from "../views/Expedition2Management.vue";
import Withdrawalsheet from "../views/Expedition3withdrawal.vue";
import Messagerie from "../views/messagerie.vue";
import param from "../views/param.vue";

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
  },
  {
    path: "/param",
    name: "param",
    component: param,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/TravelDeclaration",
    name: "TravelDeclaration",
    component: TravelDeclaration,
  },
  {
    path: "/TravelBalanceSheet",
    name: "TravelBalanceSheet",
    component: TravelBalanceSheet,
  },
  {
    path: "/lostObjectList",
    name: "lostObjectList",
    component: lostObjectList,
  },
  {
    path: "/TravelStat",
    name: "TravelStat",
    component: TravelStat,
  },
  {
    path: "/Livreurs",
    name: "Livreurs",
    component: Livreurs,
  },
  {
    path: "/ExpeditionSheet",
    name: "ExpeditionSheet",
    component: ExpeditionSheet,
  },
  {
    path: "/TravelLuggage",
    name: "TravelLuggage",
    component: TravelLuggage,
  },
  {
    path: "/Withdrawalsheet",
    name: "Withdrawalsheet",
    component: Withdrawalsheet,
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
