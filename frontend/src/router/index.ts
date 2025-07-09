import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AppointmentsView from "@/views/AppointmentsView.vue";
import ScheduleView from "@/views/ScheduleView.vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
        meta: { requiresAuth: true },
      },
      {
        path: "appointments",
        component: AppointmentsView,
        meta: { requiresAuth: true },
      },
      {
        path: "schedule",
        component: ScheduleView,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();
  const { isAuthenticated } = storeToRefs(auth);

  if (!auth.user && localStorage.getItem("accessToken")) {
    await auth.fetchMe();
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ path: "/login" });
  } else if (to.path === "/login" && auth.isAuthenticated) {
    next({ path: "/" });
  } else {
    next();
  }
});
