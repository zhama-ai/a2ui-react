/**
 * A2UI Basic Demo - Tailwind CSS Configuration
 * Uses @zhama/a2ui preset for consistent styling
 */

import a2uiPreset from '@zhama/a2ui/tailwind.preset';

/** @type {import('tailwindcss').Config} */
export default {
  // Use A2UI preset as base configuration
  presets: [a2uiPreset],

  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    // Include @zhama/a2ui components for Tailwind to scan
    '../../src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {},
  },

  plugins: [],
};
