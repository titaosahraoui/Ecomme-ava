const { match } = require("assert");
const { json } = require("body-parser");

class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    // Removing fields from the query
    const removeFields = ["keyword", "limits", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    // Advance filter ofr price and rating etc ...
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(resperPage) {
    const CurrentPage = Number(this.queryStr.page) || 1;
    const skip = resperPage * (CurrentPage - 1);

    this.query = this.query.limit(resperPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
