module.exports = {
  apps: [
    {
      name: "blindaphone",
      script: "npm",
      args: "start",
      "cwd": "/var/www/blindaphone",
      "instances": "max",
      "exec_mode": "cluster",
      "env": {
        "NODE_ENV": "production",
        "PORT": 3000
      },
      "env_production": {
        "NODE_ENV": "production",
        "PORT": 3000,
        "NEXT_PUBLIC_WHATSAPP_PHONE": "5562993737713",
        "NEXT_PUBLIC_SITE_URL": "https://blindaphone.com.br"
      },
      "error_file": "/var/log/pm2/blindaphone-error.log",
      "out_file": "/var/log/pm2/blindaphone-out.log",
      "log_file": "/var/log/pm2/blindaphone.log",
      "time": true,
      "max_memory_restart": "1G",
      "node_args": "--max-old-space-size=1024"
    }
  ]
}
