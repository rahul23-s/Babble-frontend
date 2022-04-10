import { createRouter, createWebHistory } from "vue-router";
import Chat from "../views/Chat";
import Home from "../views/Home";

const routes = [
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
