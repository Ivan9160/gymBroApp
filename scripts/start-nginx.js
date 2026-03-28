import { exec } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execAsync = promisify(exec);
const isWindows = os.platform() === 'win32';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const configPath = path.join(projectRoot, 'nginx', 'nginx.conf');

async function startNginx() {
  let nginxCmd;

  if (isWindows) {
    const nginxExeDir = 'C:\\nginx';
    nginxCmd = `cd /d ${nginxExeDir} && start nginx -c "${configPath}"`;
  } else {
    nginxCmd = `sudo nginx -t -c "${configPath}" && (sudo nginx -s reload -c "${configPath}" || sudo nginx -c "${configPath}")`;
  }

  try {
    console.log(`🚀 Attempt to reload Nginx with config: ${configPath}`);

    await execAsync(nginxCmd);

    console.log('✅ Nginx is sucessfully reloaded ');
  } catch (error) {
    if (isWindows && error.message.includes('already exists')) {
      try {
        await execAsync(`cd /d C:\\nginx && nginx -s reload -c "${configPath}"`);
        console.log('✅ Nginx is already running, config reloaded successfully!');
      } catch (reloadError) {
        console.error(`❌ Failed to reload Nginx: ${reloadError.message}`);
      }
    } else {
      console.error(`❌ Error: ${error.message}`);
    }
  }
}

startNginx();
