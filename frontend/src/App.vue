<template>
  <v-app>
    <v-main>
      <v-container>
        <v-btn @click="counter.increment">Contar: {{ counter.count }}</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useCounterStore } from "./stores/counter";

const counter = useCounterStore();
</script>
