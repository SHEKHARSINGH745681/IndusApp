import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/components/LoginPage.vue';
import SignupPage from '@/components/SignUpPage.vue';
import DashboardPage from '@/components/DashboardPage.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;