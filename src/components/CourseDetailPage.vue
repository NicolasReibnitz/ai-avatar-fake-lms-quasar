<template>
	<div class="flex items-center justify-center" style="min-height: 100vh; background-color: #f3f4f6">
		<div class="text-center">
			<h1 style="margin-bottom: 1rem; color: #1f2937; font-size: 1.875rem; font-weight: 700">Course Content</h1>
			<p style="color: #4b5563; font-size: 1.125rem">This is a blank course page as requested.</p>
			<button class="button-primary mt-8 px-4 py-2 rounded-md text-white transition-colors" @click="goBack">Back to Courses</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';

	const router = useRouter();

	async function goBack() {
		await router.push({ name: 'Courses' });
	}
</script>
