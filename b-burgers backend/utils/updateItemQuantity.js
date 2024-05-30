const updateItemQuantity = (checkout, itemIndex, quantity) => {
  const item = checkout.items[itemIndex];
  const newQuantity = item.quantity + quantity;

  if (newQuantity > 0) {
    checkout.total += item.price * quantity;
    item.quantity = newQuantity;
  } else if (newQuantity === 0) {
    checkout.total -= item.price * item.quantity;
    checkout.items.splice(itemIndex, 1);
  } else {
    throw new Error("Invalid quantity");
  }
};

module.exports = updateItemQuantity;
