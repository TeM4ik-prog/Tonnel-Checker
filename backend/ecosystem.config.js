module.exports = {
    apps: [
      {
        name: 'tonnel-checker',
        script: 'dist/main.js',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '512M',
  
        // Окружение по умолчанию — development
        env_development: {
          NODE_ENV: 'development',
          APP_URL: 'https://rnxsk3jf-8080.euw.devtunnels.ms/',
        },
  
        // Окружение для production
        env_production: {
          NODE_ENV: 'production',
          APP_URL: 'http://94.231.205.125:8080/',
        },
      },
    ],
  };
  