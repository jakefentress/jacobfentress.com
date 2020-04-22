const getAll = require('./getAll');

/**
 * Grab one item from Contentful
 *
 * @param  {Obj} type content type to retrieve
 * @return {Obj} cleaned up api response
 */
async function getOne(type) {
  const results = await getAll(type, 1);
  return results[0];
}

module.exports = getOne;
