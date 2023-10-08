const arr = [5, 2, 3, 4, 5];
function calculateMaxMinSum(arr) {
  const length = arr.length;
  if (length < 5 || length > 5) {
    return "Array must have 5 number";
  }

  arr.sort((a, b) => a - b);

  let minSum = 0;
  let maxSum = 0;

  for (let i = 0; i < 4; i++) {
    minSum += arr[i];
  }
  for (let i = 1; i < 5; i++) {
    maxSum += arr[i];
  }

  return { minSum, maxSum };
}

const result = calculateMaxMinSum(arr);
console.log(`${result.minSum} ${result.maxSum}`);
