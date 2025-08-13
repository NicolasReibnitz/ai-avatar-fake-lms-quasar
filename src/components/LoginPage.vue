<template>
	<div class="flex items-center justify-center">
		<div class="login-card glass-card shadow-4 w-100 q-pa-xl">
			<div class="text-center q-mb-xl">
				<img :src="logo" alt="simpleshow logo" class="logo glass-card shadow-4 mx-auto q-mb-lg" />
				<h1 class="text-h4 text-bold text-white q-mb-sm">LMS Login</h1>
				<p class="text-white">Please enter your credentials to access your courses</p>
			</div>

			<form class="space-y-6 flex flex-center column">
				<q-input v-model="username" class="w-100" dark color="white" label-color="white" outlined label="Username" dense />
				<q-input v-model="password" class="w-100" type="password" dark color="white" label-color="white" outlined disable label="Password" dense />
				<q-btn outline rounded class="!full-width" text-color="white" label="Login" :disabled="!isFormValid" @click="handleLogin" />
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
	import logo from 'assets/simpleshow-logo.svg';
	import { computed, ref } from 'vue';

	import courseUrl from '/freenet/index.html?url';

	const username = ref(localStorage.getItem('username') || '');
	const password = ref('********');
	const isFormValid = computed(() => username.value.trim() !== '');

	function handleLogin() {
		if (isFormValid.value) {
			localStorage.setItem('username', username.value);

			window.location.href = courseUrl;
		}
	}
</script>
