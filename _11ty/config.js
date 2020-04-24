const filters = require('./filters');
const shortcodes = require('./shortcodes');

const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const fs = require('fs');
const process = require('dotenv').config();

const input = '_src';


module.exports = function(eleventyConfig) {
  // filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });


  // shortcodes
  Object.keys(shortcodes).forEach((shortCodeName) => {
    eleventyConfig.addShortcode(shortCodeName, shortcodes[shortCodeName]);
  });


  // plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);


  // 11ty settings
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPassthroughCopy('_src/static/bundle');
  eleventyConfig.addPassthroughCopy('_src/static/css');
  eleventyConfig.addPassthroughCopy('_src/static/fonts');
  eleventyConfig.addPassthroughCopy('_src/static/img');
  eleventyConfig.addPassthroughCopy('_src/static/js');
  eleventyConfig.addPassthroughCopy('_src/static/scss');
  eleventyConfig.addPassthroughCopy('_src/.wellknown');


  // collections
  eleventyConfig.addCollection('posts', (collection) => {
    return collection.getFilteredByGlob('**/posts/*.md').reverse();
  });

  eleventyConfig.addLayoutAlias('post', 'layouts/post.html');

  eleventyConfig.addCollection('tagList', require('../_utils/getTagList'));


  // Markdown
  const markdownIt = require('markdown-it');
  const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  };

  eleventyConfig.setLibrary(
    'md',
    markdownIt(markdownItOptions)
  );

  // markdown filter
  // use as {{ "text" | markdowntohtml | safe }}
  eleventyConfig.addFilter('markdowntohtml', (text) => {
    return markdownIt(markdownItOptions).render(`${text}`);
  });


  // BrowserSync
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
  });


  // template engines and paths
  return {
    templateFormats: ['md', 'njk', 'html', 'liquid'],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: '/',

    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: input,
      includes: '_includes',
      data: '_data',
      output: '_site',
    },
  };
};
