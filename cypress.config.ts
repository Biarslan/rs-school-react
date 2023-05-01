import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';
import codeCoverageTask from '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    video: false,
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      on('file:preprocessor', vitePreprocessor());

      return config;
    },
  },
});
