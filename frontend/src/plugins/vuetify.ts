import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';

export const vuetify = createVuetify({
  theme: { defaultTheme: 'light' },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
});
