module.exports = {
  // image parameters
  // eg: {% imgParams { 'w': '800', 'fit': 'crop', 'fm': 'pjpg'}, metadata.images.api %}
  imgParams: (obj, provider = 'imgix') => {
    if (typeof(obj) !== 'object') return obj;

    if (provider == 'contentful') {
      Object.entries(obj).forEach(([key, value]) => {
        if (key === 'fit' && value === 'crop') {
          obj[key] = 'fill';
        } else if (key === 'fm' && value === 'pjpg') {
          obj[key] = 'jpg&fl=progressive';
        }
      });
    }

    let string = '';
    Object.entries(obj).forEach(([key, value], index) => {
      string += `${index > 0 ? '&' : ''}${key}=${value}`;
    });
    return string;
  },
};
