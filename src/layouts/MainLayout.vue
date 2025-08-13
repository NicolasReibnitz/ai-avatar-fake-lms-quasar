<template>
	<q-layout view="lHh Lpr lFf" class="login-bg">
		<q-fab v-if="session" v-model="fabRight" flat class="absolute-top-right q-ma-xl glass-card shadow-12" :label="user?.full_name" text-color="white" label-position="left" label-class="q-pr-md" padding="md" vertical-actions-align="right" direction="down">
			<template #icon>
				<q-icon size="md" class="absolute-center" name="sym_r_cruelty_free" />
			</template>

			<template #active-icon>
				<q-icon size="md" class="absolute-center" name="sym_r_close" />
			</template>

			<q-fab-action flat label-position="left" text-color="dark-grey" icon="sym_r_home" label="Home" class="glass-card glass-card-darker shadow-12" @click="router.push('/')" />
			<q-fab-action flat label-position="left" text-color="dark-grey" icon="sym_r_school" label="Courses" class="glass-card glass-card-darker shadow-12" @click="router.push('/courses')" />
			<q-fab-action flat label-position="left" text-color="dark-grey" icon="sym_r_data_table" label="Messages" class="glass-card glass-card-darker shadow-12" @click="router.push('/message-log')" />
			<q-fab-action flat label-position="left" text-color="dark-grey" icon="sym_r_logout" label="Logout" class="glass-card glass-card-darker shadow-12" @click="logout" />
		</q-fab>

		<q-page-container class="overflow-hidden">
			<!-- <BGBlob /> -->
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup lang="ts">
	import { supabase } from 'boot/supabase';
	// import BGBlob from 'components/BGBlob.vue';
	import { currentSession, userMetadata } from 'composables/useSession';
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';

	const session = currentSession;
	const user = userMetadata;
	const router = useRouter();
	const fabRight = ref(false);

	async function logout() {
		await supabase.auth.signOut();
		await router.push('/');
	}
</script>
