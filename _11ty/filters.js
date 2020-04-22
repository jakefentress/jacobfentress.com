const {DateTime} = require('luxon');
const fs = require('fs'); // for 'ts' filter
const jsonPrettyHtml = require('json-pretty-html').default; // for 'pretty' filter

const input = '_src'; // for 'ts' filter


module.exports = {
  // object indexOf filter
  // eg: {%- set currentIndex = projects | indexOf('slug', entry.slug) -%}
  // then: <a href="/projects/{{ projects[prevIndex].slug }}"></a>
  indexOf: (obj, attribute, value) => {
    if ((typeof(obj) !== 'object' && !Array.isArray(obj)) || !attribute || !value) return obj;

    return obj.map(function(e) {
      return e[attribute];
    }).indexOf(value);
  },


  // filter objects
  // eg: {%- set filtered = projects | filter('category', component.fields.category) -%}
  filter: (obj, attribute, value) => {
    if (typeof(obj) !== 'object' && !Array.isArray(obj)) return obj;

    let filteredArray = obj;

    if ( attribute ) {
      filteredArray = obj.filter((el) => {
        return el[attribute];
      });
    }

    if ( value ) {
      filteredArray = filteredArray.filter((el) => {
        if ( typeof(el[attribute]) === 'object' ) {
          return el[attribute].includes(value);
        } else {
          return el[attribute] == value;
        }
      });
    }

    return filteredArray;
  },


  // find object
  // eg: {%- set asset = assets | find('sys.id', '39kkYcDYYn426JRDlY63f8') -%}
  find: (obj, attribute, value) => {
    if (typeof(obj) !== 'object' && !Array.isArray(obj)) return obj;

    const attributes = attribute.split('.');

    return obj.find( (el) => {
      let current = el;
      attributes.forEach((prop) => current = current[prop]);

      return current == value;
    });
  },


  // pretty print json objects (css file required for use)
  // eg: {% set cssfile = '/static/css/screen.css' %}
  //     <link rel="stylesheet" href="{{ cssfile | url }}?ts={{ cssfile | ts }}">
  //     {% if system.environment == 'development' %}
  //        <link rel="stylesheet" href="{{ '/static/css/pretty.css' | url }}">
  //     {% endif %}
  pretty: (json) => {
    return jsonPrettyHtml(json);
  },


  // grabs the modified time of the original static file (removes the leading '/' from the file string)
  ts: (file) => {
    const stat = fs.statSync(`${input}${file}`);

    if (stat) {
      return DateTime.fromJSDate(stat.mtime, {zone: 'utc'}).toISO();
    } else {
      return '';
    }
  },


  // returns a formatted date
  // eg year: {{ 'now' | date('yyyy') }}
  // eg readable: {{ post.date | date('dd LLL yyyy') }}
  date: (dateObj, format = 'yyyy') => {
    if (dateObj == 'now') {
      return DateTime.local().toFormat(format);
    } else {
      return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat(format);
    }
  },


  // returns a 4-digit year
  // eg: {{ post.date | year }}
  year: (dateObj) => {
    return module.exports.date(dateObj, 'yyyy');
  },


  // returns a readable date
  // eg: {{ post.date | readableDate }}
  readableDate: (dateObj) => {
    return module.exports.date(dateObj, 'dd LLL yyyy');
  },


  // returns an html date string
  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  // eg: {{ post.date | htmlDateString }}
  htmlDateString: (dateObj) => {
    return module.exports.date(dateObj, 'yyyy-LL-dd');
  },


  // returns an iso date string
  // eg: {{ post.date | iso }}
  iso: (dateObj) => {
    if (dateObj == 'now') {
      return DateTime.local().toISO();
    } else {
      return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toISO();
    }
  },


  // Get the first `n` elements of a collection.
  // eg: {% set postslist = collections.posts | head(-3) %}
  head: (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  },
};
