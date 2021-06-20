import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import TravelDeclaration from "../views/TravelDeclaration.vue";
import TravelBalanceSheet from "../views/TravelBalanceSheet.vue";

import testePage from "../components/testPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
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
    path: "/testePage",
    name: "testePage",
    component: testePage,
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
