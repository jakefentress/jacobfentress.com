const contentfulClient = require('./contentfulClient');

/**
 * Grab all data from Contentful
 * @param  {String} type content type to retrieve
 * @param  {Integer} limit how many items to retrieve
 * @param  {String} order the field to use for ordering records
 * @return {Obj} cleaned up api response
 */
async function getAll(type, limit, order) {
  // how to order the records
  const queryOrder = order ? order : 'sys.createdAt';

  // max number of records to fetch per query
  const recordsPerQuery = limit ? limit : 1000;

  // number of records to skip (start at 0)
  let recordsToSkip = 0;

  // do we make a query ?
  let makeNewQuery = true;

  // entries array
  let entries = [];

  while (makeNewQuery) {
    await contentfulClient
      .getEntries({
        limit: recordsPerQuery,
        skip: recordsToSkip,
        content_type: type,
        include: 10,
        order: queryOrder,
      })
      .then((response) => {
        // update entries array with the data from the response
        entries = entries.concat(response.items);

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

  // format entries objects
  // const entriesFormatted = entries.map((item) => {
  //   const meta = {
  //     type: item.sys.contentType.sys.id,
  //     createdAt: item.sys.createdAt,
  //     updatedAt: item.sys.updatedAt,
  //   };

  //   return {
  //     ...meta,
  //     ...item.fields,
  //   };
  // });

  // return formatted entries
  return entries;
}

module.exports = getAll;
