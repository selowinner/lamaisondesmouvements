import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";


// import testePage from "../components/testPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  // {
  //   path: "/testePage",
  //   name: "testePage",
  //   component: testePage,
  //   meta: {
  //     plainLayout: true,
  //   },
  // },

  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
