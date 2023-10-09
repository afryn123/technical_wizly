function Pesentase(arr) {
  let positiveCount = 0;
  let negativeCount = 0;
  let zeroCount = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      positiveCount++;
    } else if (arr[i] < 0) {
      negativeCount++;
    } else {
      zeroCount++;
    }
  }

  const persentasePositive = (positiveCount / arr.length).toFixed(6);
  const persentaseNegative = (negativeCount / arr.length).toFixed(6);
  const persentaseZero = (zeroCount / arr.length).toFixed(6);

  return { persentasePositive, persentaseNegative, persentaseZero };
}

const arr = [-1, -3, -1, 0, 2, 5];
const result = Pesentase(arr);
console.log(
  `${result.persentaseNegative} \n${result.persentasePositive} \n${result.persentaseZero}`
);
