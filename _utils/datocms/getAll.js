const fetch = require('node-fetch');
const datocmsClient = require('./datocmsClient');

/**
 * Grab all data from Contentful
 * @param  {String} type content type to retrieve
 * @param  {Object} query the GraphQl query
 * @param  {Integer} limit how many items to retrieve
 * @param  {String} order the orderBy parameter
 * @param  {Object} filter a filter object
 * @return {Obj} cleaned up api response
 */
async function getAll(type, query, limit, order, filter) {
  // how to filter the records
  const queryFilter = filter ? filter : '{}';

  // how to order the records
  const queryOrder = order ? order : '_createdAt_DESC';

  // max number of records to fetch per query
  const recordsPerQuery = limit ? limit : 100;

  // number of records to skip (start at 0)
  let recordsToSkip = 0;

  // do we make a query ?
  let makeNewQuery = true;

  // entries array
  let entries = [];

  if (type && query) {
    const queryType = `all${type.charAt(0).toUpperCase() + type.slice(1)}`;

    while (makeNewQuery) {
      try {
        // initiate fetch
        const dato = await fetch(datocmsClient.host, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${datocmsClient.accessToken}`,
          },
          body: JSON.stringify({
            query: `{
              ${queryType}(
                first: ${recordsPerQuery},
                skip: ${recordsToSkip},
                orderBy: ${queryOrder},
                filter: ${queryFilter}
              )
              ${query}
            }`,
          }),
        });

        // store the JSON response when promise resolves
        const response = await dato.json();

        // handle DatoCMS errors
        if (response.errors) {
          const errors = response.errors;
          errors.map((error) => {
            console.log(error.message);
          });
          throw new Error('Aborting: DatoCMS errors');
        }

        // update entry array with the data from the JSON response
        entries = entries.concat(response.data[queryType]);

        // prepare for next query
        recordsToSkip += recordsPerQuery;

        // check if we are geting back less than the records we fetch per query
        // if yes, stop querying
        if (response.data[queryType].length < recordsPerQuery || recordsPerQuery < 100) {
          makeNewQuery = false;
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  // format entries objects
  // const entriesFormatted = entries.map((item) => {
  //   return {
  //     id: item.id,
  //     date: item._createdAt,
  //     title: item.title,
  //     slug: item.slug,
  //     image: item.image.url,
  //     imageAlt: item.image.alt,
  //     summary: item.intro,
  //     body: item.body,
  //     relatedBlogs: item.relatedBlogs
  //   };
  // });

  // return formatted entries
  return entries;
}

module.exports = getAll;
