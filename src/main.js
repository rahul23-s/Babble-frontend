import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store";
import { backendEndpoint } from "./constants";

axios.defaults.baseURL = backendEndpoint;

const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.use(router);
app.use(store);
app.mount("#app");
