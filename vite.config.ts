import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	server: {
		port: 3001,
		open: true,
	},
	resolve: {
		alias: {
			'~processes/*': path.resolve(__dirname, './src/processes/*'),
			'~pages/*': path.resolve(__dirname, './src/pages/*'),
			'~widgets/*': path.resolve(__dirname, './src/widgets/*'),
			'~features/*': path.resolve(__dirname, './src/features/*'),
			'~entities/*': path.resolve(__dirname, './src/entities/*'),
			'~shared/*': path.resolve(__dirname, './src/shared/*'),
		},
	},
})
