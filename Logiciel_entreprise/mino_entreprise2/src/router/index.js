import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import stationRegistring from "../views/stationRegistring.vue";
import TravelManagement from "../views/TravelManagement.vue";
import ExpeditionManagement from "../views/ExpeditionManagement.vue";
import LostObjetManagement from "../views/LostObjetManagement.vue";
import Analytics from "../views/Analytics.vue";

import login from "../views/login.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/stationRegistring",
    name: "stationRegistring",
    component: stationRegistring,
  },
  {
    path: "/TravelManagement",
    name: "TravelManagement",
    component: TravelManagement,
  },
  {
    path: "/ExpeditionManagement",
    name: "ExpeditionManagement",
    component: ExpeditionManagement,
  },
  {
    path: "/LostObjetManagement",
    name: "LostObjetManagement",
    component: LostObjetManagement,
  },
  {
    path: "/Analytics",
    name: "Analytics",
    component: Analytics,
  },  
  {
    path: "/login",
    name: "login",
    component: login,
    // beforeEnter: ifNotAuthenticated,
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
