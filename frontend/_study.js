const resolveInTwoSeconds = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(1), 1000);
  });
};

const resolveInThreeSeconds = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(2), 2000);
  });
};

const resolveInFiveSeconds = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(3), 3000);
  });
};

const run = async () => {
  const asyncFunc = [
    resolveInTwoSeconds(),
    resolveInThreeSeconds(),
    resolveInFiveSeconds(),
  ];

  const results = await Promise.race(asyncFunc);
  console.log(results);
};

run();
