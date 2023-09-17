import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Router
import { router } from './router/index.js';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// Generics components
import AppPagination from '@/components/generics/AppPagination.vue';
import AppLoader from '@/components/generics/AppLoader.vue';
import AppAlert from '@/components/generics/AppAlert.vue'; 

const app = createApp(App);
app.component('AppPagination', AppPagination);
app.component('AppLoader', AppLoader);
app.component('AppAlert', AppAlert);
app.use(router);
app.mount('#app');
