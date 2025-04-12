import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import {generateSocialImages} from './plugins/social-images'

export default defineConfig({
	plugins: [sveltekit(), generateSocialImages()],
  resolve: {
    preserveSymlinks: true
  },
  css: {
    preprocessorOptions: {
      scss: {
      }
    }
  }
});
