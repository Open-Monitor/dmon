export default ({request}, callback) => {
  console.log(request, callback);

  callback(null, {
    didInsert: true,
    frequencyAdjustment: 0,
  });
};
