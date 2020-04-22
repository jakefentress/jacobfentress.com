const datocmsClient = {
  accessToken:
    process.env.DATOCMS_TOKEN,
  host:
    process.env.ELEVENTY_ENV === 'development' ?
      process.env.DATOCMS_HOST_DEV :
      process.env.ELEVENTY_ENV === 'qa' ?
        process.env.DATOCMS_HOST_DEV :
        process.env.DATOCMS_HOST,
};

module.exports = datocmsClient;
