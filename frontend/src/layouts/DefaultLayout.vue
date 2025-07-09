<template>
  <v-app>
    <v-navigation-drawer app>
      <Sidebar />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-toolbar-title>Agenda Pro</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="logout" title="Sair">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="pa-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { api } from '@/lib/axios';

const router = useRouter();
const auth = useAuthStore();

const logout = async () => {
  await api.post('/auth/logout');
  auth.logout();
  router.push({ name: 'login' });
};
</script>
