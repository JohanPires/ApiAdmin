import { createRouter, createWebHistory } from "vue-router";
import AddForm from "../components/AddForm.vue";
import AllProduct from "@/components/AllProduct.vue";
import Login from "../components/LoginComponent.vue";
import { isLoggedIn } from "../utils/auth";
import ProfilComponent from "../components/ProfilComponent.vue";
import Register from "../components/RegisterComponent.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/home",
      name: "home",
      meta: { requiresAuth: true },
      component: AllProduct,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/form",
      name: "form",
      meta: { requiresAuth: true },
      component: AddForm,
    },
    {
      path: "/profil",
      name: "profil",
      meta: { requiresAuth: true },
      component: ProfilComponent,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next("/login");
  } else {
    next();
  }
});

export default router;
