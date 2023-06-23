import marked from "marked";
import Tocify from "../components/tocify.tsx";

const NavList = ({ content }) => {
  const tocify = new Tocify();
  const renderer = new marked.Renderer();

  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer: renderer,
  });
  marked(content);

  return <div>{tocify && tocify.render()}</div>;
};
export default NavList;
