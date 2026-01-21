const TAX_RATE = 1.13; // a constant that can be use in other function/file

function calculateTotalWithTax(orders, type, minimunValue) { // the name is descriptive enough to understand what is it's purpose
  return orders
  .filter((order) => { 
    return order.type === type.toString() && order.value > minimunValue
  })
  .reduce((total, order) => {
    return total + order.value * TAX_RATE
  }, 0)
}

const orders = [
  {type: "shoes", value: 200}, 
  {type: "shirt", value: 20}, 
  {type: "shoes", value: 150}
];

console.log(calculateTotalWithTax(orders, "shoes", 1)); // Output: 395.5
