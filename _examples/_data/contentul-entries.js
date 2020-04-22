const getAll = require('../../_utils/contentful/getAll');

// export for 11ty
module.exports = getAll('project', 1000, '-fields.date');
