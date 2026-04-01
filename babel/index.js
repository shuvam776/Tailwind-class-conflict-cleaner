import parse from "../core/parser.js";
import resolve from "../core/resolver.js";

export default function () {
  return {
    visitor: {
      JSXAttribute(path) {
        if (path.node.name.name !== "className") return;

        const valueNode = path.node.value;

        if (!valueNode || valueNode.type !== "StringLiteral") return;

        const original = valueNode.value;

        const newClass = resolve(parse(original)).join(" ");

        if (newClass !== original) {
          path.node.value.value = newClass;
        }
      }
    }
  };
}