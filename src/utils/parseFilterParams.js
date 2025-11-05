const parseObjectId = (id) => {
  const isString = typeof id === 'string';
  if (!isString) return;

  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (objectIdRegex.test(id)) {
    return id;
  }
};

export const parseFilterParams = (query) => {
  const { categoryId } = query;
  const filter = {};

  const parsedCategoryId = parseObjectId(categoryId);

  if (parsedCategoryId) {
    filter.categoryId = parsedCategoryId;
  }

  return filter;
};
