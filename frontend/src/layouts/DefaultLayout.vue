<template>
    <v-app>
      <v-navigation-drawer app>
        <Sidebar />
      </v-navigation-drawer>
  
      <v-app-bar app>
        <v-toolbar-title>Agenda Pro</v-toolbar-title>
      </v-app-bar>
  
      <v-main class="pa-4">
        <router-view />
      </v-main>
    </v-app>
  </template>
  
  <script setup lang="ts">
  import Sidebar from '../components/Sidebar.vue';
  </script>
  