import './styles/style.scss';
// Import icon libraries
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css';
// Import Quasar css
import 'quasar/src/css/index.sass';

import App from 'App.vue';
import { Quasar } from 'quasar';
import quasarIconSet from 'quasar/icon-set/material-symbols-rounded';
import router from 'router';
import { createApp } from 'vue';

const app = createApp(App);

app.use(router);
app.use(Quasar, {
	plugins: {}, // import Quasar plugins and add here
	iconSet: quasarIconSet
	/*
  config: {
    brand: {
      // primary: '#e46262',
      // ... or all other brand colors
    },
    notify: {...}, // default set of options for Notify Quasar plugin
    loading: {...}, // default set of options for Loading Quasar plugin
    loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  }
  */
});

app.mount('#app');
