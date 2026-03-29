const path = require('path');

module.exports = {
  apps: [
    {
      name: "gymbro-backend",
      script: "./dist/main.js", 
      cwd: "./server",
      env: { NODE_ENV: "production", PORT: 3000 }
    },
    {
      name: "gymbro-frontend",
      script: "./node_modules/serve/build/main.js",
      args: "-s dist -l 5173",
      cwd: "./client",
      env: { NODE_ENV: "production" }
    },
    {
      name: "gymbro-nginx",
      script: "./scripts/nginx-start.js",
      autorestart: false
    }
  ]
};