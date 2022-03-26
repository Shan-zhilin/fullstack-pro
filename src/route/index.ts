import {createRouter,createWebHashHistory} from 'vue-router'
const login = () => import('../pages/login.vue')
const routes = [
    {path:'/',component:login},
    {path:'/login',component:login}
]

const router = createRouter({
    history:createWebHashHistory(),
    routes,
})
export default router