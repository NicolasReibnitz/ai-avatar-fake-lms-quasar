<template>
	<q-page class="q-pa-xl">
		<div class="text-h2 text-white text-weight-thin q-mb-xl">Message Log Viewer</div>

		<q-card>
			<q-card-section>
				<div class="row q-col-gutter-md">
					<q-select v-model="selectedProject" :options="projects" label="Project" emit-value map-options outlined dense class="col-12 col-md-3" />

					<q-select v-model="selectedUser" :options="users" label="User" emit-value map-options outlined dense class="col-12 col-md-3" />

					<q-select v-model="selectedEntryType" :options="entryTypes" label="Entry Type" emit-value map-options outlined dense class="col-12 col-md-2" />

					<q-input v-model="searchText" label="Search Text" outlined dense class="col-12 col-md-grow" />

					<div class="col-12 col-md-auto">
						<q-btn label="Refresh" icon="sym_r_refresh" flat @click="fetchMessages" />
					</div>
				</div>
			</q-card-section>

			<q-separator />

			<q-table :rows="filteredMessages" :columns="columns" :wrap-cells="true" row-key="id" dense flat bordered :filter="searchText" :pagination="{ rowsPerPage: 10 }" :loading="loading" :table-row-class-fn="() => 'vertical-top'">
				<!-- <template #top-right>
					<q-btn label="Refresh" icon="sym_r_refresh" flat @click="fetchMessages" />
				</template> -->

				<template #header="props">
					<q-tr :props="props" class="vertical-top">
						<q-th v-for="col in props.cols" :key="col.name" auto-width :props="props">
							{{ col.label }}
						</q-th>
					</q-tr>
				</template>

				<template #body-cell-text="props">
					<q-td :props="props" :auto-width="false">
						<q-tooltip v-if="props.row.text">
							{{ props.row.text }}
						</q-tooltip>
						<div>{{ props.row.text }}</div>
					</q-td>
				</template>

				<template #body-cell-entry_type="props">
					<q-td :props="props" :auto-width="true">
						<q-chip :label="props.value" text-color="white" size="sm" :color="chipColor(props.value)" dense />
					</q-td>
				</template>
			</q-table>
		</q-card>
	</q-page>
</template>

<script setup lang="ts">
	import { supabase } from 'boot/supabase';
	import type { QTableProps } from 'quasar';
	import { computed, onMounted, ref } from 'vue';

	const messages = ref<QTableProps['rows']>([]);
	const loading = ref(false);

	const selectedProject = ref(null);
	const selectedUser = ref(null);
	const selectedEntryType = ref(null);
	const searchText = ref('');

	const projects = ref<{ label: string; value: string }[]>([]);
	const users = ref<{ label: string; value: string }[]>([]);
	const entryTypes = ref([
		{ label: 'User', value: 'user' },
		{ label: 'Avatar', value: 'avatar' },
		{ label: 'System', value: 'system' }
	]);

	const columns: QTableProps['columns'] = [
		{
			name: 'timestamp',
			label: 'Time',
			field: 'timestamp',
			sortable: true,
			align: 'left',
			format: val => new Date(val).toLocaleString(),
			style: 'width: 1%; white-space: nowrap;',
			headerStyle: 'width: 1%; white-space: nowrap;'
		},
		{
			name: 'user_name',
			label: 'User',
			sortable: true,
			field: row => row.sessions?.user_profiles?.first_name + ' ' + row.sessions?.user_profiles?.last_name || '–',
			style: 'width: 1%; white-space: nowrap;',
			headerStyle: 'width: 1%; white-space: nowrap;'
		},
		{
			name: 'project_name',
			label: 'Project',
			field: row => row.sessions?.projects?.name || '–',
			sortable: true,
			style: 'width: 1%; white-space: nowrap;',
			headerStyle: 'width: 1%; white-space: nowrap;'
		},
		{
			name: 'entry_type',
			label: 'Type',
			field: 'entry_type',
			sortable: true,
			style: 'width: 1%; white-space: nowrap;',
			headerStyle: 'width: 1%; white-space: nowrap;'
		},
		{
			name: 'text',
			label: 'Text',
			field: 'text',
			sortable: false,
			classes: 'text-col',
			align: 'left'

			// style: 'max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
			// classes: 'text-left ellipsis',
			// headerStyle: 'max-width: 300px;'
		}
	];

	onMounted(async () => {
		await fetchFilters();
		await fetchMessages();
	});

	async function fetchMessages() {
		loading.value = true;
		const { data, error } = await supabase.from('messages').select('*,sessions(*,projects(*),user_profiles(*))').order('timestamp', { ascending: false });

		if (error) {
			console.error('Failed to fetch messages:', error);
		} else {
			messages.value = data;
		}
		loading.value = false;
	}

	async function fetchFilters() {
		const { data: proj } = await supabase.from('projects').select('id, name');
		projects.value = (proj || []).map(p => ({ label: p.name, value: p.id }));

		const { data: usr } = await supabase.from('user_profiles').select('id, first_name, last_name');
		users.value = (usr || []).map(u => ({ label: `${u.first_name} ${u.last_name}`, value: u.id }));
	}

	const filteredMessages = computed(() => {
		return messages.value.filter(msg => {
			return (!selectedProject.value || msg.sessions?.projects?.id === selectedProject.value) && (!selectedUser.value || (msg.session_id && userMatches(msg.session_id, selectedUser.value))) && (!selectedEntryType.value || msg.entry_type === selectedEntryType.value);
		});
	});

	function userMatches(sessionId: string, userId: string) {
		// Replace with actual logic if denormalized
		return true; // placeholder
	}

	function chipColor(type: string) {
		switch (type) {
			case 'user':
				return 'blue';
			case 'avatar':
				return 'green';
			case 'system':
				return 'grey';
			default:
				return 'primary';
		}
	}
</script>

<style scoped>
	.q-chip {
		text-transform: capitalize;
	}

	.text-col {
		white-space: break-spaces;
		word-break: break-word;
	}
</style>
