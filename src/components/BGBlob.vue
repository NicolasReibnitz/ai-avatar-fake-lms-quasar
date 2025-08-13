<template>
	<div class="blob-wrapper">
		<div class="blob"></div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
	.blob {
		position: absolute;
		width: 500px;
		height: 500px;
		animation: move 25s infinite alternate;
		background: linear-gradient(180deg, rgb(47 184 255 / 0.42) 31.77%, #5c9df1 100%);
		mix-blend-mode: color-dodge;
		transition: 1s cubic-bezier(0.07, 0.8, 0.16, 1);
	}

	.blob-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
		width: 100%;
		height: 100%;
	}

	.blob:hover {
		width: 520px;
		height: 520px;
		box-shadow:
			inset 0 0 0 5px rgb(255 255 255 / 0.6),
			inset 100px 100px 0 0 #fa709a,
			inset 200px 200px 0 0 #784ba8,
			inset 300px 300px 0 0 #2b86c5;
		filter: blur(30px);
	}

	@keyframes move {
		from {
			border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
			transform: translate(-10vw, -5vh) rotate(-90deg);
		}

		to {
			border-radius: 76% 24% 33% 67% / 68% 55% 45% 32%;

			/* transform: translate(140%, 80%) rotate(-10deg); */
			transform: translate(85vw, 50vh) rotate(-10deg);
		}
	}
</style>
