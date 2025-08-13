import AuthRedirect from 'components/AuthRedirect.vue';
import CourseDetailPage from 'components/CourseDetailPage.vue';
import CoursesPage from 'components/CoursesPage.vue';
import LoginPage from 'components/LoginPage.vue';
import MessageLogViewer from 'components/MessageLogViewer.vue';
import SignupLoginPage from 'components/SignupLoginPage.vue';
import MainLayout from 'layouts/MainLayout.vue';
import AuthError from 'pages/AuthError.vue';
import ErrorNotFound from 'pages/ErrorNotFound.vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: MainLayout,
		meta: {
			error_description: '',
			error: '',
			error_code: ''
		},
		children: [
			{
				path: '/',
				name: 'Signup',
				component: SignupLoginPage
			},
			{
				path: '/login',
				name: 'Login',
				component: LoginPage
			},
			{
				path: '/courses',
				name: 'Courses',
				component: CoursesPage
			},
			{
				path: '/course/:id',
				name: 'CourseDetail',
				component: CourseDetailPage
			},
			{
				path: '/message-log',
				name: 'MessageLog',
				component: MessageLogViewer
			},
			{
				path: '/auth-redirect',
				name: 'AuthRedirect',
				component: AuthRedirect
			},
			{
				path: '/auth-error',
				name: 'AuthError',
				component: AuthError
			}
		]
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: ErrorNotFound
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

router.beforeEach(to => {
	const encoded = window.location.hash;
	const query = new URLSearchParams(encoded?.slice(2));
	const queryParams = Object.fromEntries(query.entries());

	to.meta.error_description = queryParams.error_description;
	to.meta.error = queryParams.error;
	to.meta.error_code = queryParams.error_code;

	if (queryParams.error && to.name !== 'AuthError') return { name: 'AuthError' };

	return true;
});

export default router;
