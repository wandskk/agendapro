<template>
    <v-list>
      <template v-if="user?.role === 'PATIENT'">
        <v-list-item to="/">
          <v-list-item-title>Agendar Consulta</v-list-item-title>
        </v-list-item>
        <v-list-item to="/appointments">
          <v-list-item-title>Minhas Consultas</v-list-item-title>
        </v-list-item>
      </template>
  
      <template v-else-if="user?.role === 'PROFESSIONAL'">
        <v-list-item to="/schedule">
          <v-list-item-title>Minha Agenda</v-list-item-title>
        </v-list-item>
        <v-list-item to="/appointments">
          <v-list-item-title>Consultas Agendadas</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';
  const auth = useAuthStore();
  const user = auth.user;
  </script>
  