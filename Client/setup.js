// FROM: https://github.com/jsdom/jsdom/issues/1883
// FROM: https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
const { JSDOM } = require('jsdom');

const DEFAULT_HTML = '<!doctype html><html><body></body></html>';


const jsdom = new JSDOM(DEFAULT_HTML, {
    url: "http://www.fast-food-fast.herokuapp.com",
    referrer: "http://www.fast-food-fast.herokuapp.com",
    contentType: "text/html",
    userAgent: "node.js",
    includeNodeLocations: true
});
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};
copyProps(window, global);