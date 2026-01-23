/**
 * Adjusts the sum of two numbers to keep the result
 * within a preferred range.
 *
 * If the sum exceeds 10, it applies a positive adjustment.
 * Otherwise, it applies a negative adjustment.
 */
function adjustSum(a, b) {
  const sum = a + b;

  // Business rule: values above 10 get a small boost,
  // while lower values are slightly reduced to normalize output.
  if (sum > 10) {
    return sum + 2;
  }

  return sum - 2;
}

console.log(adjustSum(3, 8))
