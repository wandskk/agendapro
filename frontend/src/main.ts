import { createApp } from 'vue';
import App from './App.vue';
import { vuetify } from './plugins/vuetify';
import { createPinia } from 'pinia';
import { router } from './router';
import 'vuetify/styles/main.css';

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(createPinia());

app.mount('#app');
