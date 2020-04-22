const contentful = require('contentful');

const contentfulClient = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken:
    process.env.ELEVENTY_ENV === 'development' ?
      process.env.CONTENTFUL_TOKEN_DEV :
      process.env.ELEVENTY_ENV === 'qa' ?
        process.env.CONTENTFUL_TOKEN_DEV :
        process.env.CONTENTFUL_TOKEN,
  host:
    process.env.ELEVENTY_ENV === 'development' ?
      process.env.CONTENTFUL_HOST_DEV :
      process.env.ELEVENTY_ENV === 'qa' ?
        process.env.CONTENTFUL_HOST_DEV :
        process.env.CONTENTFUL_HOST,
  removeUnresolved: true,
});

module.exports = contentfulClient;
