import { groups } from "./groups.js";

export default function resolve(classList) {
  const finalClasses = [];

  for (const cls of classList) {
    const prefix = getPrefix(cls);

    const groupKey = findGroup(prefix);

    if (!groupKey) {
      finalClasses.push(cls);
      continue;
    }
    removeSamePrefix(finalClasses, prefix);

    finalClasses.push(cls);
  }

  return finalClasses;
}


//get prefix: p-4 → p, px-2 → px
function getPrefix(cls) {
  return cls.split("-")[0];
}


//find group (padding, margin, etc.)
function findGroup(prefix) {
  for (const key in groups) {
    if (groups[key].includes(prefix)) {
      return key;
    }
  }
  return null;
}


//remove only exact prefix conflicts
function removeSamePrefix(arr, prefix) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (getPrefix(arr[i]) === prefix) {
      arr.splice(i, 1);
    }
  }
}