import { spawn } from 'node:child_process';
import client from 'cloud-config-client';

const config = await client.load({
    endpoint: 'http://192.168.1.15:30050',
    name: process.env.APP_NAME,
    profiles: process.env.PROFILE,
});

config.forEach((key, value) => {
    const envName = key
        .replaceAll('.', '_')
        .replaceAll('-', '_')
        .toUpperCase();

    process.env[envName] ??= String(value);
});

process.env.DATABASE_URL = `postgresql://${process.env.SPRING_DATASOURCE_USERNAME}:${process.env.SPRING_DATASOURCE_PASSWORD}@${process.env.NEXT_DATASOURCE_URL}?sslmode=disable`;

console.log('Loaded Spring configuration');

const npmCli = process.env.npm_execpath;
const npmArgs = process.argv.slice(2);

if (!npmCli) {
    throw new Error('application-config.mjs must be started through npm');
}

if (npmArgs.length === 0) {
    throw new Error('No npm command was provided');
}

const child = spawn(process.execPath, [npmCli, ...npmArgs], {
    env: process.env,
    stdio: 'inherit',
});

child.once('error', (error) => {
    console.error('Failed to run npm command:', error);
    process.exitCode = 1;
});

child.once('exit', (code) => {
    process.exitCode = code ?? 1;
});

