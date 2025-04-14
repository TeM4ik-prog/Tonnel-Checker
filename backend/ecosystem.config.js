module.exports = {
    apps: [
      {
        name: 'tonnel-checker',
        script: 'dist/main.js',
        instances: 1, // или 'max' для кластерного режима
        autorestart: true,
        watch: false,
        max_memory_restart: '512M',
  
        env: {
          NODE_ENV: 'development',
          APP_URL: 'http://127.0.0.54:8080',
        },
  
        env_production: {
          NODE_ENV: 'production',
          APP_URL: 'https://rnxsk3jf-8080.euw.devtunnels.ms/',
        },
      },
    ],
  };
  