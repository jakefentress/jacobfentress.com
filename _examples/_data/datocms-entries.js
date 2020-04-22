const getAll = require('../../_utils/datocms/getAll');

const query = `{
  modularContent {
    ... on TextRecord {
      _modelApiKey
      text(markdown: true)
    }
    ... on QuoteRecord {
      _modelApiKey
      text
      citation
    }
    ... on GalleryRecord {
      _modelApiKey
      images {
        url
      }
    }
  }
}`;

// export for 11ty
module.exports = getAll('articles', query);
