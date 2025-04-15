import Vue from "vue";
import Router from "vue-router";

import Login from "@/views/Login.vue";
import NotFound from "@/views/NotFound.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import Products from "@/views/Products.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    {
      path: "/dashboard",
      component: DashboardLayout,
      children: [
        {
          path: "products",
          component: Products,
        },
        // Adicione mais páginas aqui se quiser
      ],
    },
    { path: "*", component: NotFound },
  ],
});
