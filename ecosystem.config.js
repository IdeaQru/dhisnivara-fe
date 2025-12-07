module.exports = {
  apps: [{
    name: 'dhisnivara-fe-app',
    script: 'npm',
    args: 'start',
     cwd: '/root/dhisnivara-fe', 
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3018
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
}
