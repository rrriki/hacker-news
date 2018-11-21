// Using cron is overkill
const scheduleFunction = (fn, interval) => {
  fn(); // Execute right away the first time
  setInterval(() => {
    fn();
  }, interval);
};

module.exports = scheduleFunction;
