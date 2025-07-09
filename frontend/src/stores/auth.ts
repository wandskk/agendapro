import { defineStore } from "pinia";
import { api } from "@/lib/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | {
      id: string;
      name: string;
      email: string;
      role: string;
    },
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async login(email: string, password: string) {
      const res = await api.post("/auth/login", { email, password });
      this.user = res.data.user;
      if (res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem("accessToken");
    },

    async fetchMe() {
      try {
        const res = await api.get("/users/me");
        this.user = res.data;
      } catch (error) {
        this.user = null;
      }
    },
  },
});
