<template>
	<div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
		<div>
			<div style="font-size: 30vh">ERROR</div>

			<div class="text-h2" style="opacity: 0.4">{{ errorDescription || 'Something went wrong with your login link.' }}</div>
			<div class="text-h4" style="opacity: 0.4">{{ errorDetails }}</div>

			<q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/" label="Go Home" no-caps />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';

	const router = useRouter();

	const errorDescription = ref(router.currentRoute.value.meta.error_description);
	const errorDetails = ref('');

	const error = (router.currentRoute.value.meta.error as string)?.replace(/_/g, ' ') || '';
	const errorCode = (router.currentRoute.value.meta.error_code as string)?.replace(/_/g, ' ') || '';
	const errorDetailsString = [error, errorCode].filter(Boolean).join(': ');

	errorDetails.value = errorDetailsString ? `(${errorDetailsString})` : '';
</script>
