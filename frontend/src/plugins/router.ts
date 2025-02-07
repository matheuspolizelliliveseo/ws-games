import { createRouter, createWebHistory } from "vue-router";
import Home from "../modules/base/views/home.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/login",
            name: "login", 
            component: () => import("@/modules/base/views/login.vue")
        },
        {
            path: "/tictactoe",
            name: "tictactoe",
            component: () => import("@/modules/tictactoe/views/tictactoe.vue"),
        },
    ],
});


router.beforeEach((to,from, next) => {
    if(to.name != "login" && localStorage.get('user') == null) next({name:"login"})
    else next()
})

export default router;
