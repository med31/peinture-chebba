/** Point d’entrée : Vue + Pinia (avant les pages) + routes. Cours : 19-visite-guidee-du-code.md */
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { router } from "./router";
import "./assets/styles/main.scss";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
