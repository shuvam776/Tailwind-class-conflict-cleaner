# Tailwind Class Cleaner

Automatically detect and fix conflicting Tailwind CSS classes.

Supports:

* 🔍 **ESLint** → detect & auto-fix while coding
* ⚡ **Babel** → optimize at build time

---

## 🚀 Installation

```bash
npm install tailwind-class-cleaner
```

---

# 🧠 What It Does

Fixes conflicting Tailwind classes like:

```jsx
<div className="p-2 p-4 text-sm text-lg bg-red-500 bg-blue-500" />
```

➡️ Becomes:

```jsx
<div className="p-4 text-lg bg-blue-500" />
```

---

# 🔍 ESLint Usage (Recommended)

Works in modern setups like **Vite + TypeScript + ESLint v9 (flat config)**.

---

## 1. Setup ESLint Config

Create or update `eslint.config.js`:

```js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import tailwindCleaner from "tailwind-class-cleaner";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    plugins: {
      "tailwind-cleaner": tailwindCleaner,
    },

    rules: {
      "tailwind-cleaner/no-conflicts": "warn",
    },
  },
];
```

---

## 2. Run ESLint

```bash
npx eslint . --fix
```

---

## 💡 Example (ESLint Fix)

```tsx
className="p-2 p-4 px-2 px-6 text-sm text-lg"
```

➡️ becomes:

```tsx
className="p-4 px-6 text-lg"
```

---

# ⚡ Babel Usage (Build-Time Optimization)

Use this if you want automatic cleanup during builds.

---

## 1. Install Babel (if not already)

```bash
npm install @babel/core @babel/cli @babel/preset-react
```

---

## 2. Create Babel Config

### `babel.config.json`

```json
{
  "presets": ["@babel/preset-react"],
  "plugins": ["tailwind-class-cleaner/babel"]
}
```

---

## 3. Run Babel

```bash
npx babel src --out-dir dist
```

---

## 💡 Example (Babel Transform)

```jsx
className="p-2 p-4 text-sm text-lg"
```

➡️ becomes:

```jsx
className="p-4 text-lg"
```

---

# 🧪 Template Literal Support

Partially supported:

```tsx
className={`p-2 p-4 ${active ? "px-2 px-6" : ""}`}
```

➡️ becomes:

```tsx
className={`p-4 ${active ? "px-2 px-6" : ""}`}
```

✅ Static parts are optimized
⚠️ Dynamic expressions are left untouched

---

# ⚠️ Limitations (v0.1)

* Only supports:

  * static class strings
  * partial template literals

* Does NOT yet support:

  * `clsx()` / `classnames`
  * conditional merging logic
  * Tailwind variants (`md:`, `hover:`)
  * Tailwind config awareness

---

# 🧠 Why This Instead of `tailwind-merge`?

| Feature                 | tailwind-merge | tailwind-class-cleaner |
| ----------------------- | -------------- | ---------------------- |
| Runtime cost            | ❌ Yes          | ✅ No                   |
| Auto fix in editor      | ❌ No           | ✅ Yes                  |
| Build-time optimization | ❌ No           | ✅ Yes                  |
| Requires wrapping code  | ❌ Yes          | ✅ No                   |

---

# 🛠 Roadmap

* Support `clsx` / `classnames`
* Handle variants (`md:`, `hover:`)
* Tailwind config awareness
* Vite plugin

---

# 📄 License

MIT
