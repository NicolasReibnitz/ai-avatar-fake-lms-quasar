<template>
	<q-page class="flex flex-center">
		<q-spinner size="xl" color="primary" />
	</q-page>
</template>

<script setup lang="ts">
	import { supabase } from 'boot/supabase';
	import { onMounted } from 'vue';
	import { useRouter } from 'vue-router';

	const router = useRouter();

	onMounted(async () => {
		// Supabase automatically parses token from hash on load
		const {
			data: { session },
			error
		} = await supabase.auth.getSession();

		if (session) {
			// ✅ Optionally store profile, fetch user, etc.
			await router.replace('/courses'); // or redirect to dashboard
		} else {
			console.error(error);
			await router.replace('/');
		}
	});
</script>
