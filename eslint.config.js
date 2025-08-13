import eslint from '@eslint/js';
import pluginQuasar from '@quasar/app-vite/eslint';
import prettierSkipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import * as importX from 'eslint-plugin-import-x';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default defineConfigWithVueTs(
	importX.flatConfigs.recommended,
	importX.flatConfigs.typescript,
	{
		name: 'ignores',
		ignores: ['*.d.ts', '**/coverage', '**/dist', 'src/types/supabase.ts']
	},
	{
		name: 'gnurgh',
		extends: [
			pluginQuasar.configs.recommended(),
			eslint.configs.recommended,
			...typescriptEslint.configs.recommended,
			...eslintPluginVue.configs['flat/recommended']
		],
		files: ['**/*.{ts,vue}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				'#imports': 'readonly'
			},
			parser: eslintPluginVue.parser,
			parserOptions: {
				parser: typescriptEslint.parser,
				project: ['./tsconfig.json'],
				extraFileExtensions: ['.vue'],
				tsconfigRootDir: import.meta.dirname
			}
		}
	},
	{
		name: 'simple-import-sort',
		plugins: {
			'simple-import-sort': simpleImportSort
		},
		rules: {
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error'
		}
	},
	{
		name: 'interactive/rules/import-x',
		rules: {
			'import-x/no-named-as-default-member': 'off',
			'import-x/first': 'error',
			'import-x/newline-after-import': 'error',
			'import-x/no-duplicates': 'error',
			'import-x/no-unresolved': 'off'
		}
	},
	vueTsConfigs.recommendedTypeChecked,
	{
		name: 'typescript-eslint',
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'off'
		}
	},
	prettierSkipFormatting
);
