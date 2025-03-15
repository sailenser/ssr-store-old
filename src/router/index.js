import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'

import ProductsList from '@/views/ProductsList.vue';
import Product from '@/views/Product.vue';
import Cart from '@/views/Cart.vue';
import Checkout from '@/views/Checkout.vue';
import OfficeBase from '@/views/office/OfficeBase.vue';
import OfficeIndex from '@/views/office/Index.vue';
import OfficeOrders from '@/views/office/OfficeOrders.vue';
import E404 from '@/views/E404.vue';
import Login from '@/views/Login.vue';

const routes = [
    {
        path: '/',
        name: 'products',
        component: ProductsList
    },
    {
        path: '/products/:id',
        name: 'products-item',
        component: Product
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart
    },
    {
        path: '/order',
        name: 'checkout',
        component: Checkout
    },
    {
        path: '/office',
        name: 'base',
        meta: { auth: true },
        component: OfficeBase,
        children: [
            {
                path: '',
                component: OfficeIndex,
                name: 'office'
            },
            {
                path: 'orders',
                component: OfficeOrders,
                name: 'office-orders'
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: { guest: true },
        component: Login,
    },
    {
        path: '/:any(.*)',
        component: E404
    }
]

export default function createAppRouter(){
    const router = createRouter({
        routes,
        history: import.meta.env.SSR ?
            createMemoryHistory(import.meta.env.BASE_URL) :
            createWebHistory(import.meta.env.BASE_URL)
    })

    return router;
}