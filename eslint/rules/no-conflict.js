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

        const value = node.value;

        if (value?.type === "Literal" && typeof value.value === "string") {
          handleString(context, node, value.value);
        }

        if (value?.type === "JSXExpressionContainer" &&
            value.expression.type === "TemplateLiteral") {
          handleTemplate(context, node, value.expression);
        }
      },
    };
  },
};


function handleString(context, node, original) {
  const newClass = resolve(parse(original)).join(" ");

  if (newClass === original) return;

  context.report({
    node,
    message: `Tailwind conflict: "${original}" → "${newClass}"`,
    fix(fixer) {
      return fixer.replaceText(node.value, `"${newClass}"`);
    },
  });
}


function handleTemplate(context, node, template) {
  const quasis = template.quasis;

  let changed = false;

  const newQuasis = quasis.map((q) => {
    const original = q.value.raw;

    const resolved = resolve(parse(original)).join(" ");

    if (resolved !== original) {
      changed = true;
    }

    return resolved;
  });

  if (!changed) return;

  context.report({
    node,
    message: "Tailwind conflicts in template literal",
    fix(fixer) {
      let result = "`";

      for (let i = 0; i < newQuasis.length; i++) {
        result += newQuasis[i];

        if (template.expressions[i]) {
          result += "${" + context.sourceCode.getText(template.expressions[i]) + "}";
        }
      }

      result += "`";

      return fixer.replaceText(node.value, `{${result}}`);
    },
  });
}