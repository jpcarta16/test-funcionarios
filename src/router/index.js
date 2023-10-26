import { createRouter, createWebHistory } from 'vue-router';
import TestList from '@/components/TestList.vue';
import TestDetail from '@/components/TestDetail.vue';

const routes = [
    { path: '/', component: TestList },
    { path: '/test/:id', component: TestDetail, props: true }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
