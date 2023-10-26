import { createApp } from 'vue';
import App from './App.vue'; // Importa el componente raíz de la aplicación
import router from './router'; // Importa el enrutador Vue Router

const app = createApp(App);

app.use(router); // Usa Vue Router

app.mount('#app'); // Monta la aplicación en el elemento con el ID "app" en el DOM
