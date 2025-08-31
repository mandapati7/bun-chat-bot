import concurrently from 'concurrently';

concurrently(
  [
    {
      command: 'bun run --watch start',
      name: 'server',
      prefixColor: 'cyan',
      cwd: 'packages/server',
    },
    { command: 'bun run dev', name: 'client', prefixColor: 'green', cwd: 'packages/client' },
  ],
  {
    killOthers: ['failure', 'success'],
    restartTries: 3,
  }
).result.then(success, failure);

function success() {
  console.log('Both processes exited successfully');
}

function failure() {
  console.error('One of the processes failed to start');
  process.exit(1);
}
