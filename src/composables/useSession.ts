// src/composables/useSession.ts
import type { Session } from '@supabase/supabase-js';
import { supabase } from 'boot/supabase';
import { computed, ref } from 'vue';

// Initialize with null and specify the type
const currentSession = ref<Session | null>(null);

// Fetch the session immediately without top-level await
void supabase.auth
	.getSession()
	.then(res => {
		currentSession.value = res.data.session;
	})
	.catch(error => {
		console.error('Failed to get session:', error);
	});

const userMetadata = computed(() => currentSession.value?.user?.user_metadata);

supabase.auth.onAuthStateChange((_event, session) => {
	currentSession.value = session;
});

export { currentSession, userMetadata };
