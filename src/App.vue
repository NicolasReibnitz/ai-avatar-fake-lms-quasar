<template>
	<router-view />
</template>

<script setup lang="ts">
	// import { onMounted } from 'vue';
	// import { useRouter } from 'vue-router';

	// const router = useRouter();

	// if (window.location.hash.includes('error=')) {
	// 	const encoded = window.location.hash;
	// 	const query = new URLSearchParams(encoded?.slice(2));
	// 	const queryParams = Object.fromEntries(query.entries());
	// 	router
	// 		.replace({
	// 			path: router.currentRoute.value.path,
	// 			query: {}, // Empty query object removes all query parameters
	// 			hash: router.currentRoute.value.hash
	// 		})
	// 		.catch(error => {
	// 			console.error('Failed to clean URL:', error);
	// 		});
	// 	void router.push({ name: 'AuthError', params: queryParams });

	// 	// Remove query parameters from URL after we've captured the data
	// 	// onMounted(() => {
	// 	// 	// Replace current URL with the same path but without query parameters
	// 	// 	router
	// 	// 		.replace({
	// 	// 			path: router.currentRoute.value.path,
	// 	// 			query: {}, // Empty query object removes all query parameters
	// 	// 			hash: router.currentRoute.value.hash
	// 	// 		})
	// 	// 		.catch(error => {
	// 	// 			console.error('Failed to clean URL:', error);
	// 	// 		});
	// 	// });
	// }
</script>
