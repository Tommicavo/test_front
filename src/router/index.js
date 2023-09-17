import { createRouter, createWebHistory } from "vue-router";

import HomePage from '@/components/pages/HomePage.vue';
import NotFoundPage from '@/components/pages/NotFoundPage.vue';

import CreatePage from '@/components/pages/CreatePage.vue';
import DetailPage from '@/components/pages/DetailPage.vue';

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes: [
        {path: '/', name: 'homePage', component: HomePage},
        {path: '/posts/:id', name: 'detailPage', component: DetailPage},
        {path: '/create', name: 'createPage', component: CreatePage},

        {path: '/notFoundPage', name: 'notFoundPage', component: NotFoundPage},
        {path: '/:pathMatch(.*)*', redirect: '/notFoundPage'},
    ] 
});

export { router }
