// Example of unnecessary repetition
function calculateOrderTotal(order) {
  let total = 0;

  // Electronics
  if (order.category === "electronics") {
    if (order.price > 100) {
      total = order.price * 0.9;
    } else {
      total = order.price * 0.95;
    }
    console.log("Order processed from unnecessary repetition");
  }

  // Clothing
  if (order.category === "clothing") {
    if (order.price > 100) {
      total = order.price * 0.9;
    } else {
      total = order.price * 0.95;
    }
    console.log("Order processed from unnecessary repetition");
  }

  // Furniture
  if (order.category === "furniture") {
    if (order.price > 100) {
      total = order.price * 0.9;
    } else {
      total = order.price * 0.95;
    }
    console.log("Order processed from unnecessary repetition");
  }

  return total;
}

// Applying the DRY principle
function calculateDiscountedPrice(price) {
  return price > 100 ? price * 0.9 : price * 0.95;
}

function DRYFunction(order) {
  if (!["electronics", "clothing", "furniture"].includes(order.category)) {
    return 0;
  }

  console.log("Order processed");
  return calculateDiscountedPrice(order.price);
}

// Example
shirt = {category: "clothing", price: 50}
TV = {category: "electronics", price: 500}

console.log(calculateOrderTotal(TV))
console.log(DRYFunction(shirt))
console.log("------------------------------------")
console.log(calculateOrderTotal(shirt))
console.log(DRYFunction(TV))
