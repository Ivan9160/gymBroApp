module.exports = {
  apps: [
    {
      name: "gymbro-backend",
      script: "dist/main.js", 
      cwd: "./server",
      shell: true,
      env: { NODE_ENV: "production", PORT: 3000 }
    },
    {
      name: "gymbro-frontend",
      script: "./node_modules/serve/build/main.js",
      args: "-s dist -l 5173",
      cwd: "./client",
      shell: true,
      env: { NODE_ENV: "production" }
    },
    {
      name: "gymbro-nginx",
      script: "./scripts/start-nginx.js",
      shell: true,
      autorestart: false
    }
  ]
};