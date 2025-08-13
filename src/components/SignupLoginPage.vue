<template>
	<q-page class="flex items-center justify-center">
		<q-card class="login-card glass-card q-pa-lg shadow-24">
			<q-card-section>
				<div class="text-center q-mb-md">
					<img :src="logo" alt="Logo" class="logo glass-card shadow-24 q-mb-md" />
					<h1 class="text-h5 text-white">{{ isSignup ? 'Sign Up' : 'Login' }}</h1>
				</div>

				<q-form class="column q-gutter-md text-white flex flex-center column items-stretch" @submit="handleSubmit">
					<q-input v-if="isSignup" v-model="firstName" autocomplete="given-name" label="First Name" outlined dense color="white" label-color="white" dark />
					<q-input v-if="isSignup" v-model="lastName" autocomplete="family-name" label="Last Name" outlined dense color="white" label-color="white" dark />
					<q-input v-model="email" type="email" autocomplete="email" label="Email" outlined dense color="white" label-color="white" dark />
					<q-input v-model="password" type="password" autocomplete="current-password" label="Password" outlined dense color="white" label-color="white" dark />

					<q-btn outline rounded text-color="white" :disabled="!isFormValid" :label="isSignup ? 'Sign Up' : 'Login'" type="submit" color="primary" class="q-my-lg self-center" />

					<q-btn flat color="white" class="q-mt-sm" :label="isSignup ? 'Already have an account? Login!' : 'Need an account? Sign up!'" @click="isSignup = !isSignup" />
				</q-form>

				<q-banner v-if="message" class="q-mt-md bg-positive text-white">{{ message }}</q-banner>
				<q-banner v-if="error" class="q-mt-md bg-negative text-white">{{ error }}</q-banner>
			</q-card-section>
		</q-card>
	</q-page>
</template>

<script setup lang="ts">
	import logo from 'assets/simpleshow-logo.svg';
	import { supabase } from 'boot/supabase';
	import router from 'router';
	import { computed, ref } from 'vue';

	const isDev = ref(process.env.DEV);
	const isSignup = ref(false);

	const email = ref(isDev.value ? 'nicolas.reibnitz@simpleshow.com' : '');
	const password = ref(isDev.value ? 'dudedude' : '');
	const firstName = ref(isDev.value ? 'Nicolas' : '');
	const lastName = ref(isDev.value ? 'Reibnitz' : '');

	const message = ref('');
	const error = ref('');

	const isFormValid = computed(() => email.value.trim() !== '');

	async function handleSubmit() {
		message.value = '';
		error.value = '';

		if (!email.value || !password.value) {
			error.value = 'Email and password are required.';
			return;
		}

		if (isSignup.value) {
			// Sign up + insert profile
			const { error: signupError } = await supabase.auth.signUp({
				email: email.value,
				password: password.value,
				options: {
					emailRedirectTo: isDev.value ? 'http://localhost:9001/#/auth-redirect' : 'https://simpleshowinteractive.com/features/avatar-library/#/auth-redirect',
					data: {
						full_name: `${firstName.value} ${lastName.value}`,
						first_name: firstName.value,
						last_name: lastName.value
					}
				}
			});

			if (signupError) {
				error.value = signupError.message;
				return;
			}

			message.value = 'Signup successful! Please check your email to confirm your account.';
		} else {
			// Login
			const { error: loginError } = await supabase.auth.signInWithPassword({
				email: email.value,
				password: password.value
			});

			if (loginError) {
				error.value = loginError.message;
			} else {
				message.value = 'Login successful!';
				await router.push('/courses'); // or redirect to dashboard
			}
		}
	}
</script>
