// Price/stock helpers shared by the product card and the product page.
// A discount exists only when the product really has a lower
// priceAfterDiscount; percent and saved amount are derived from those two numbers.
export const getPriceInfo = (item) => {
  const price = Number(item?.price);
  const after = Number(item?.priceAfterDiscount);
  const hasDiscount = !isNaN(price) && !isNaN(after) && after >= 1 && after < price;
  return {
    hasDiscount,
    price,
    final: hasDiscount ? after : price,
    save: hasDiscount ? price - after : 0,
    // rounded whole percent; 0 when the discount is below 1% (then no % is shown)
    percent: hasDiscount ? Math.round(((price - after) / price) * 100) : 0,
  };
};

export const isOutOfStock = (item) => typeof item?.quantity === "number" && item.quantity <= 0;
