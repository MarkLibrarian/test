function validateRequest(...predicates) {
  return (req, res, next) => {
    try {
      predicates.forEach((predicate) => predicate(req));
    } catch (err) {
      return next(err);
    }
    return next();
  };
}

function isPositiveIntegerString(s) {
  return (
    typeof s === 'string' && /^[0-9]+$/.test(s) && Number.parseInt(s, 10) > 0
  );
}

module.exports = {
  validateRequest,
  isPositiveIntegerString,
};
