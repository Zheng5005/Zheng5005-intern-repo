const TAX_RATE_WITH_DISCOUNT = 0.15;
const TAX_RATE_STANDARD = 0.1;
const BONUS_THRESHOLD = 10;

const CATEGORY_BONUS = {
  A: 2,
  B: 4,
  C: 6,
};

function calculateTotal(items, requiredType, minimumValue, hasDiscount) {
  let total = 0;
  let qualifiedItemCount = 0;

  for (const item of items) {
    if (hasInvalidValue(item)) {
      logError();
      continue;
    }

    total += calculateItemContribution(
      item,
      requiredType,
      minimumValue,
      hasDiscount,
      () => qualifiedItemCount++
    );

    total += getCategoryBonus(item.category);
  }

  return applyBulkPenalty(total, qualifiedItemCount);
}

function hasInvalidValue(item) {
  return item.value < 0;
}

function logError() {
  console.log("Something went wrong");
}

function calculateItemContribution(
  item,
  requiredType,
  minimumValue,
  hasDiscount,
  onQualified
) {
  if (item.type !== requiredType) {
    return 0;
  }

  if (item.value > minimumValue) {
    onQualified();
    return item.value * getTaxRate(hasDiscount);
  }

  if (item.hasExtraFee) {
    return 5;
  }

  return 0;
}

function getTaxRate(hasDiscount) {
  return hasDiscount ? TAX_RATE_WITH_DISCOUNT : TAX_RATE_STANDARD;
}

function getCategoryBonus(category) {
  return CATEGORY_BONUS[category] ?? 0;
}

function applyBulkPenalty(total, qualifiedItemCount) {
  if (qualifiedItemCount > BONUS_THRESHOLD) {
    return total - 3;
  }
  return total;
}

