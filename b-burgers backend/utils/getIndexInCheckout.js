const getItemIndexInCheckout = (items, burgerId) => {
  return items.findIndex((item) => item.burger.toString() === burgerId);
};

module.exports = getItemIndexInCheckout;
