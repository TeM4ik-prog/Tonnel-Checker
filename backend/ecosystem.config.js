// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: 'tonnel-checker',
        script: 'dist/main.js',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '512M',
        env: {
          NODE_ENV: 'production'
        },
      },
    ],
  };
  