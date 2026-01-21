/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const iterations: number = data.iterations ?? 100_000_000;

  let result = 0;
  for (let i = 0; i < iterations; i++) {
    result += i;
  }

  postMessage({
    type: 'finished',
    result
  });
});
