// In an Nx workspace, you generally only need one postcss.config.js file at the root of your project.
// This file will be used by all the libraries and applications within the workspace.
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
