export const typeCreator = (prefix, types) => {
  const PREFIX = prefix.toUpperCase();
  return types.reduce((aggr, type) => {
    aggr[type] = `${PREFIX}_${type}`;
    return aggr;
  }, {});
};

export const apiTypeCreator = prefix => {
  return {
    [`${prefix}`]: {
      FETCH: `${prefix}_FETCH`,
      SUCCESS: `${prefix}_SUCCESS`,
      ERROR: `${prefix}_ERROR`,
      RESET: `${prefix}_RESET`
    }
  };
};

export const actionCreator = type => payload => {
  return {
    type,
    payload
  };
};
