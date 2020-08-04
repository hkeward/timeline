import Vue from "vue";
import VueRouter from "vue-router";
import TimelineApp from "../views/TimelineApp/TimelineApp.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "timeline",
    component: TimelineApp
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
