const arr = [-1, -3, -1, 0, 2, 5];

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
  const persentasePositive = parseFloat(
    (positiveCount / arr.length).toFixed(6)
  );
  const persentaseNegative = parseFloat(
    (negativeCount / arr.length).toFixed(6)
  );
  const persentaseZero = parseFloat((zeroCount / arr.length).toFixed(6));

  console.log({ persentasePositive, persentaseNegative, persentaseZero });
}

Pesentase(arr);
