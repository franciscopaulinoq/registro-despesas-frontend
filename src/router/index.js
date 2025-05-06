import { createRouter, createWebHistory } from 'vue-router'
import DespesasList from '../pages/DespesasList.vue'
import DespesaCreate from '../pages/DespesaCreate.vue'
import DespesaEdit from '../pages/DespesaEdit.vue'
import DespesaView from '../pages/DespesaView.vue'

const routes = [
    {
        path: '/',
        name: 'despesas-list',
        component: DespesasList,
        meta: { title: 'Lista de Despesas' }
    },
    {
        path: '/create',
        name: 'despesa-create',
        component: DespesaCreate,
        meta: { title: 'Nova Despesa' }
    },
    {
        path: '/edit/:id',
        name: 'despesa-edit',
        component: DespesaEdit,
        props: true,
        meta: { title: 'Editar Despesa' }
    },
    {
        path: '/view/:id',
        name: 'despesa-view',
        component: DespesaView,
        props: true,
        meta: { title: 'Visualizar Despesa' }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    next()
})

export default router