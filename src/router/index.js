import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/graphs/:id",
    component: () =>
      import(/* webpackChunkName: "graph" */ "../views/Graph.vue"),
    children: [
      {
        path: "/",
        name: "GraphView",
        component: () =>
          import(/* webpackChunkName: "graphView" */ "../views/GraphView.vue")
      },
      {
        path: "edit",
        name: "GraphEdit",
        component: () =>
          import(/* webpackChunkName: "graphEdit" */ "../views/GraphEdit.vue")
      },
      {
        path: "statistics",
        name: "GraphStatistics",
        component: () =>
          import(
            /* webpackChunkName: "graphStatistics" */ "../views/GraphStatistics.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
