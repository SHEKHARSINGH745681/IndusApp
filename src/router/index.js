import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/components/LoginPage.vue';
import SignupPage from '@/components/SignUpPage.vue';
import DashboardPage from '@/components/DashboardPage.vue';

const routes = [
  // Default root redirects to login
  {
    path: '/',
    redirect: '/login'
  },
  // Auth routes
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
  // Main app
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
  },
  // Catch-all for unknown routes: redirect to /login
  {
    path: '/:pathMatch(.*)*', // Vue 3 recommended syntax
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;