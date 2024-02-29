const ApiFeatures = (query, queryStr) => {
  const search = () => {
    const keyword = queryStr.keyword
      ? {
          name: {
            $regex: queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    query = query.find({ ...keyword });
    return query;
  };

  const filter = () => {
    const queryCopy = { ...queryStr };
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    query = query.find(JSON.parse(queryStr));

    return query;
  };

  const pagination = (resultPerPage) => {
    const currentPage = Number(queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    query = query.limit(resultPerPage).skip(skip);

    return query;
  };

  return {
    search,
    filter,
    pagination,
  };
};

export default ApiFeatures;
