// 整体布局
import Layout from '../layout/layout.vue';

const bookingRoutes = [
	{
		path: '/booking',
		component: Layout,
		redirect: '/booking/supplierList',
		children: [
			{
				path: '/booking/supplierList',
				name: 'supplierList',
				component: () => import('../views/booking/supplierList.vue'),
				meta: {
					title: '旅店列表',
				},
			},
			{
				path: '/booking/order',
				name: 'oder',
				component: () => import('../views/booking/order.vue'),
				meta: {
					title: '订单详情',
				},
			},
		],
	},
];

export default bookingRoutes;
