const date = () => {
  const today = new Date();
  const option = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };
  return today.toLocaleDateString("en-US", option);
};

module.exports = date;
