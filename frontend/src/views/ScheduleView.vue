<template>
  <v-container>
    <h1 class="mb-4">Configurar Disponibilidade</h1>

    <v-form @submit.prevent="handleSubmit">
      <v-row>
        <v-col cols="12" sm="4">
          <v-select
            v-model="dayOfWeek"
            :items="days"
            label="Dia da semana"
            item-title="label"
            item-value="value"
            required
          />
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field v-model="startTime" label="Início (HH:mm)" required />
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field v-model="endTime" label="Fim (HH:mm)" required />
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn type="submit" color="primary" block>Adicionar</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-divider class="my-6" />

    <v-list>
      <v-list-item
        v-for="(item, i) in schedule"
        :key="item.id"
        class="d-flex justify-space-between"
      >
        <span
          >{{ daysMap[item.dayOfWeek] }} — {{ item.startTime }} às
          {{ item.endTime }}</span
        >
        <v-btn
          icon="mdi-delete"
          @click="remove(item.id)"
          color="red"
          variant="text"
        />
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";

const dayOfWeek = ref<number | null>(null);
const startTime = ref("");
const endTime = ref("");
const schedule = ref<any[]>([]);

const auth = useAuthStore();

const days = [
  { value: 0, label: "Domingo" },
  { value: 1, label: "Segunda" },
  { value: 2, label: "Terça" },
  { value: 3, label: "Quarta" },
  { value: 4, label: "Quinta" },
  { value: 5, label: "Sexta" },
  { value: 6, label: "Sábado" },
];

const daysMap = Object.fromEntries(days.map((d) => [d.value, d.label]));

const fetchSchedule = async () => {
  const { data } = await api.get("/schedule");
  schedule.value = data;
};

const handleSubmit = async () => {
  if (!dayOfWeek.value || !startTime.value || !endTime.value) return;

  await api.post("/schedule", {
    dayOfWeek: dayOfWeek.value,
    startTime: startTime.value,
    endTime: endTime.value,
  });

  dayOfWeek.value = null;
  startTime.value = "";
  endTime.value = "";

  await fetchSchedule();
};

const remove = async (id: string) => {
  await api.delete(`/schedule/${id}`);
  await fetchSchedule();
};

onMounted(() => {
  fetchSchedule();
});
</script>
