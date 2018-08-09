/**
 *
 * @param {*} res
 * @param { Object } json
 * @param { int } status
 */
const respond = (res, json, status) => {
  res.format({
    json: () => {
      let code = status || 200;
      res.status(code).json(json);
    }
  });
}

module.exports = {
  respond
}
