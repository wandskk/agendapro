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
  actions: {
    async login(email: string, password: string) {
      const res = await api.post("/auth/login", { email, password });
      console.log(res.data);
      this.user = res.data.user;
    },
  },
});
