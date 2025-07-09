import { createApp } from 'vue';
import App from './App.vue';
import { vuetify } from './plugins/vuetify';
import { createPinia } from 'pinia';
import { router } from './router';
import { useAuthStore } from './stores/auth';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(vuetify);

const auth = useAuthStore(pinia);
await auth.fetchMe();

app.mount('#app');
