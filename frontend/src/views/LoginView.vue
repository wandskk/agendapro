<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card width="400" class="pa-4">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field v-model="email" label="Email" type="email" required />
          <v-text-field
            v-model="password"
            label="Senha"
            type="password"
            required
          />
          <v-btn type="submit" color="primary" block>Entrar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = useAuthStore();

const handleLogin = async () => {
  try {
    await auth.login(email.value, password.value);
    router.push("/");
  } catch (error) {
    alert("Email ou senha inválidos");
  }
};
</script>
