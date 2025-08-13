<template>
	<q-page class="q-pa-xl flex column items-start justify-start overflow-hidden">
		<div class="text-h2 text-white text-weight-thin q-mb-xl">Courses</div>

		<main>
			<div class="courses-grid text-white">
				<div v-for="project in projects" :key="project.id" class="project-card glass-card shadow-8" @click="openProject(project)">
					<div class="poster">
						<img v-if="project.poster" :src="project.poster" :alt="project.name" />
					</div>
					<div class="project-content">
						<h4>{{ project.companies?.name }}</h4>

						<!-- eslint-disable-next-line vue/no-v-html -->
						<h6 class="q-mb-md" v-html="project.name.replaceAll('\\n', '<br />')"></h6>

						<p class="q-mb-md project-description">{{ project.description }}</p>

						<div class="flex row justify-between items-center">
							<span style="font-size: 0.875rem">{{ project.avatar_name }}</span>
							<span v-if="project.category" :style="getCategoryStyle(project.category)">
								{{ project.category }}
							</span>
						</div>
					</div>
				</div>
			</div>
		</main>

		<!-- <main style="max-width: 80rem; padding: 8rem 1rem 4rem; margin: 0 auto">
			<div class="courses-grid">
				<div v-for="course in courses" :key="course.id" style="overflow: hidden; border-radius: 0.5rem; background-color: white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); cursor: pointer; transition: box-shadow 0.3s ease" @click="openCourse(course)">
					<div style="display: flex; height: 10rem; align-items: center; justify-content: center; background-color: #3b82f6">
						<img v-if="course.image" :src="course.image" :alt="course.title" style="width: 100%; height: 100%; object-fit: cover" />
						<div v-else style="color: white; font-size: 3rem; font-weight: 700">
							{{ course.title.charAt(0) }}
						</div>
					</div>
					<div style="padding: 1.5rem">
						<h3 style="margin-bottom: 0.5rem; color: #1f2937; font-size: 1.25rem; font-weight: 600">
							{{ course.title }}
						</h3>
						<p style="margin-bottom: 1rem; color: #4b5563">{{ course.description }}</p>
						<div class="flex" style="align-items: center; justify-content: space-between">
							<span style="color: #6b7280; font-size: 0.875rem">{{ course.lessons }} lessons</span>
							<span :style="getCategoryStyle(course.category)">
								{{ course.category }}
							</span>
						</div>
					</div>
				</div>
			</div>
		</main> -->
	</q-page>
</template>

<script setup lang="ts">
	import antiCorruptionImg from 'assets/anti-corruption.webp';
	import businessImg from 'assets/business.jpg';
	import dataScienceImg from 'assets/data-science.webp';
	import designImg from 'assets/design.webp';
	import marketingImg from 'assets/marketing.jpg';
	import mobileDevImg from 'assets/mobile-dev.webp';
	import webDevImg from 'assets/web-dev.jpg';
	import { supabase } from 'boot/supabase';
	import { userMetadata } from 'src/composables/useSession';
	import { Tables } from 'types/supabase';
	import { type Ref, ref } from 'vue';
	import { useRouter } from 'vue-router';

	import freenetCourseUrl from '/freenet/index.html?url';

	const router = useRouter();
	type ProjectWithCompany = Tables<'projects'> & {
		companies?: Tables<'companies'> | null;
	};
	const projects: Ref<ProjectWithCompany[]> = ref([]);

	type CourseCategory = 'Development' | 'Data Science' | 'Design' | 'Business' | 'Marketing' | 'Compliance' | 'Sales';
	interface Course {
		id: number;
		title: string;
		description: string;
		lessons: number;
		category: CourseCategory;
		image?: string;
		link?: string;
	}

	async function getProjects() {
		const { data, error } = await supabase.from('projects').select('*,companies(*)');

		if (error) {
			console.error(error);
			return;
		}

		if (data.length > 0) {
			projects.value = data;
		}
	}

	void getProjects();

	async function startSession(project: Tables<'projects'>) {
		const { data: sessionData, error } = await supabase
			.from('sessions')
			.insert([
				{
					user_id: userMetadata.value?.sub,
					project_id: project.id,
					user_name: userMetadata.value?.full_name
				}
			])
			.select()
			.single();

		if (error) {
			console.error(error);
			return;
		}

		return sessionData.id;
	}

	async function openProject(project: Tables<'projects'>) {
		console.log(userMetadata.value);
		console.log(project);
		console.log(project?.link);
		console.log('freenetCourseUrl', freenetCourseUrl);

		const sessionId = await startSession(project);

		const url = `${project?.link}?session=${sessionId}`;

		window.open(url, '_blank');
	}

	async function openCourse(course: Course) {
		if (course.link) {
			// Navigate to the course page
			window.location.href = course.link;
		} else {
			// Navigate to the course detail page
			await router.push({ name: 'CourseDetail', params: { id: course.id } });
		}
	}

	// Mock course data
	const courses: Ref<Course[]> = ref([
		{
			id: 7,
			title: 'Anti Corruption',
			description: 'Learn about anti-corruption strategies and best practices.',
			lessons: 12,
			category: 'Compliance',
			image: antiCorruptionImg,
			link: freenetCourseUrl
		},
		{
			id: 1,
			title: 'Introduction to Web Development',
			description: 'Learn the basics of HTML, CSS, and JavaScript to build interactive websites.',
			lessons: 12,
			category: 'Development',
			image: webDevImg
		},
		{
			id: 2,
			title: 'Data Science Fundamentals',
			description: 'Explore data analysis, visualization, and machine learning concepts.',
			lessons: 8,
			category: 'Data Science',
			image: dataScienceImg,
			link: ''
		},
		{
			id: 3,
			title: 'User Experience Design',
			description: 'Master the principles of UX design to create intuitive user interfaces.',
			lessons: 10,
			category: 'Design',
			image: designImg
		},
		{
			id: 4,
			title: 'Project Management Essentials',
			description: 'Learn effective methodologies for managing projects of any size.',
			lessons: 6,
			category: 'Business',
			image: businessImg
		},
		{
			id: 5,
			title: 'Mobile App Development',
			description: 'Build native mobile applications for iOS and Android platforms.',
			lessons: 14,
			category: 'Development',
			image: mobileDevImg
		},
		{
			id: 6,
			title: 'Digital Marketing Strategy',
			description: 'Create effective digital marketing campaigns across multiple channels.',
			lessons: 9,
			category: 'Marketing',
			image: marketingImg
		}
	]);

	function getCategoryStyle(category: string) {
		const styles = {
			Development: 'background-color: #dbeafe; color: #1e40af; padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;',
			'Data Science': 'background-color: #f3e8ff; color: #6b21a8; padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;',
			Design: 'background-color: #fce7f3; color: #9d174d; padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;',
			Business: 'background-color: #d1fae5; color: #065f46; padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;',
			Marketing: 'background-color: #fef3c7; color: #92400e; padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;',
			Compliance: 'background-color: #e0f2fe; color: #0284c7; padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;',
			Sales: 'background-color: #fce7f3; color: #9d174d; padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;'
		};

		return styles[category as keyof typeof styles] || 'background-color: #f3f4f6; color: #4b5563; padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;';
	}

	async function logout() {
		// Navigate back to the login page
		// await router.push({ name: 'Login' });
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
			return;
		}
		await router.push({ name: 'Login' });
	}
</script>

<style lang="scss" scoped>
	.my-card {
		border-radius: 1rem;
	}

	.project-card {
		overflow: hidden;
		border-radius: 1rem;
		cursor: pointer;
		transition: box-shadow 0.3s ease;
	}

	.project-content {
		padding: 1.5rem;

		p,
		h5,
		h6 {
			color: white !important;
			filter: drop-shadow(1px 1px 1px #000);
		}
	}

	.poster {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #3b82f6;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
</style>
