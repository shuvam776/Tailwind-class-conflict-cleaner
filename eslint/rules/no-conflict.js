import parse from "../../core/parser.js";
import resolve from "../../core/resolver.js";

export default {
  meta: {
    type: "problem",
    fixable: "code",
  },

  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name !== "className") return;

        if (!node.value || node.value.type !== "Literal") return;

        const original = node.value.value;

        if (typeof original !== "string") return;

        const newClass = resolve(parse(original)).join(" ");

        if (newClass === original) return;

        context.report({
          node,
          message: `Tailwind conflict: "${original}" → "${newClass}"`,
          fix(fixer) {
            return fixer.replaceText(node.value, `"${newClass}"`);
          },
        });
      },
    };
  },
};