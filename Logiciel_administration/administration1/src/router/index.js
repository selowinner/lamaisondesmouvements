import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import UserManagement from "../views/UserManagement.vue";
import TravelManagement from "../views/TravelManagement.vue";
import LostObjectManagement from "../views/LostObjectManagement.vue";
import ExpeditionManagement from "../views/ExpeditionManagement.vue";



Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/UserManagement",
    name: "UserManagement",
    component: UserManagement,
  },
  {
    path: "/TravelManagement",
    name: "TravelManagement",
    component: TravelManagement,
  },
  {
    path: "/LostObjectManagement",
    name: "LostObjectManagement",
    component: LostObjectManagement,
  },
  {
    path: "/ExpeditionManagement",
    name: "ExpeditionManagement",
    component: ExpeditionManagement,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
