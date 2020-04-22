const contentfulClient = require('./contentfulClient');

/**
 * Grab all assets from Contentful
 * @param  {Integer} limit how many items to retrieve
 * @param  {String} order the field to use for ordering records
 * @return {Obj} cleaned up api response
 */
async function getAllAssets(limit, order) {
  // how to order the records
  const queryOrder = order ? order : 'sys.createdAt';

  // max number of records to fetch per query
  const recordsPerQuery = limit ? limit : 1000;

  // number of records to skip (start at 0)
  let recordsToSkip = 0;

  // do we make a query ?
  let makeNewQuery = true;

  // Blogposts array
  let assets = [];

  while (makeNewQuery) {
    await contentfulClient
      .getAssets({
        limit: recordsPerQuery,
        skip: recordsToSkip,
        include: 10,
        order: queryOrder,
      })
      .then((response) => {
        // update assets array with the data from the response
        assets = assets.concat(response.items);

        // prepare for next query
        recordsToSkip += recordsPerQuery;

        // check if we are geting back less than the records we fetch per query
        // if yes, stop querying
        if (response.items.length < recordsPerQuery || recordsPerQuery < 1000) {
          makeNewQuery = false;
        }
      })
      .catch(console.error);
  }

  // return assets array
  return assets;
}

module.exports = getAllAssets;
