const Products = require("../model/Products");

const getProductsStatic = async (req, res) => {
  // const search = "a";
  const products = await Products.find({})
    .sort("price")
    .select("name price")
    .limit(3)
    .skip(2);
  res.status(201).json({ data: products });
};

const getProducts = async (req, res) => {
  const query = req.query;
  const { name, company, featured, sort, field, numericFilter } = query;
  let queriesObj = { ...query };

  if (name) {
    queriesObj.name = { $regex: name, $options: "i" };
  }

  if (company) {
    queriesObj.company = company;
  }

  if (featured) {
    const boolean = featured === "true" ? true : false;
    queriesObj.featured = boolean;
  }
  // numeric filter
  if (numericFilter) {
    const regex = /(>|>=|<|<=|=)/g;
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };

    let filters = numericFilter.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );

    filters = filters.split(",");
    filters = filters
      .map((item) => {
        return item.split("-");
      })
      .forEach((item) => {
        [field, operator, value] = item;
        queriesObj[field] = { [operator]: Number(value) };
      });
  }
  let products = Products.find(queriesObj);

  if (sort) {
    console.log(sort);
    const sortList = sort.split(",").join(" ");

    products = products.sort(sortList);
  } else {
    products = products.sort("createdAt");
  }

  if (field) {
    let fieldList = field.split(",").join(" ");
    products = products.select(fieldList);
  } else {
    products = products.sort("createdAt");
  }

  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  products = await products.limit(limit).skip(skip);
  res.status(201).json({ nbHits: products.length, data: products });
};

module.exports = {
  getProductsStatic,
  getProducts,
};
