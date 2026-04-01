export default function parse(classString) {
  if (!classString || typeof classString !== "string") return [];

  return classString.trim().split(/\s+/).filter(Boolean);
}