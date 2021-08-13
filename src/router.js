import Vue from "vue";
import Router from "vue-router";
import authGuard from "./guards/authGuards";

Vue.use(Router);

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            // component: () => import('@/views/logi'),
            redirect: "/locations",
        },
        {
            path: '/login',
            name: "Login",
            beforeEnter: authGuard,
            component: () => import('@/views/Login')
        },
        {
            path: '/',
            component: () => import('@/views/Index'),
            beforeEnter: authGuard,
            children: [
                {
                    path: '/locations',
                    name: "Locations",
                    beforeEnter: authGuard,
                    component: () => import('@/views/locations/Locations')
                },
            ]
        }
    ]

})