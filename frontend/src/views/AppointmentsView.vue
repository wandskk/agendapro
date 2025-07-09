<template>
  <v-container>
    <h1 class="mb-4">Minhas Consultas</h1>

    <v-table class="mb-8" v-if="appointments.length">
      <thead>
        <tr>
          <th>Profissional</th>
          <th>Data</th>
          <th>Observações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="a in appointments" :key="a.id">
          <td>{{ a.professional?.name || "-" }}</td>
          <td>{{ formatDate(a.date) }}</td>
          <td>{{ a.notes || "-" }}</td>
        </tr>
      </tbody>
    </v-table>

    <v-divider class="my-6" />

    <h2 class="mb-4">Nova Consulta</h2>

    <v-form @submit.prevent="handleSubmit">
      <v-row>
        <v-col cols="12" sm="4">
          <v-select
            v-model="selectedProfessional"
            :items="professionals"
            item-title="name"
            item-value="id"
            label="Profissional"
            required
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="selectedDate"
            label="Data (yyyy-mm-dd)"
            required
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-select
            v-model="selectedTime"
            :items="availableTimes"
            label="Horário"
            required
          />
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="notes" label="Observações" />
        </v-col>
        <v-col cols="12">
          <v-btn type="submit" color="primary" block>Agendar</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { api } from "@/lib/axios";

const appointments = ref<any[]>([]);
const professionals = ref<any[]>([]);
const selectedProfessional = ref("");
const selectedDate = ref("");
const selectedTime = ref("");
const availableTimes = ref<string[]>([]);
const notes = ref("");

const fetchAppointments = async () => {
  const { data } = await api.get("/appointments");
  appointments.value = data;
};

const fetchProfessionals = async () => {
  const { data } = await api.get("/users/professionals");
  professionals.value = data;
};

const fetchAvailableTimes = async () => {
  if (!selectedProfessional.value || !selectedDate.value) return;
  const { data } = await api.get(`/public/available-times`, {
    params: {
      professionalId: selectedProfessional.value,
      date: selectedDate.value,
    },
  });
  availableTimes.value = data;
};

const handleSubmit = async () => {
  await api.post("/appointments", {
    professionalId: selectedProfessional.value,
    date: `${selectedDate.value}T${selectedTime.value}:00`,
    notes: notes.value,
  });

  selectedProfessional.value = "";
  selectedDate.value = "";
  selectedTime.value = "";
  notes.value = "";
  availableTimes.value = [];

  await fetchAppointments();
};

onMounted(() => {
  fetchAppointments();
  fetchProfessionals();
});

watch([selectedProfessional, selectedDate], fetchAvailableTimes);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
</script>
