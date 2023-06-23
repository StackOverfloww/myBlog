import marked from "marked";
import { defaultConfig } from "../config/markedDefaultConfig.js";
import "highlight.js/styles/monokai-sublime.css";
import Tocify from "../components/tocify.tsx";

const tocify = new Tocify();
const renderer = new marked.Renderer();

// 将MD的内容改造成支持锚点跳转
renderer.heading = function (text, level, raw) {
  const anchor = tocify.add(text, level);
  return `<a id="${anchor}" href="#${anchor}"><h${level}>${text}</h${level}></a>\n`;
};

marked.setOptions({
  renderer: renderer,
  ...defaultConfig,
});

export const formatMarkDown = (content) => marked(content);
