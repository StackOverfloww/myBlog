import hljs from "highlight.js";
const defaultConfig = {
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
};
export { defaultConfig };
