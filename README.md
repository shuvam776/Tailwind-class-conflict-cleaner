# Tailwind Class Cleaner

Automatically detect and fix conflicting Tailwind CSS classes.

Works in two ways:

* 🔍 ESLint → detect + auto-fix while coding
* ⚡ Babel → optimize during build

---

## 🚀 Installation

```bash
npm install tailwind-class-cleaner
```

---

## 🧠 What It Does

Fixes class conflicts like:

```jsx
<div className="p-2 p-4 text-sm text-lg bg-red-500 bg-blue-500" />
```

➡️ Becomes:

```jsx
<div className="p-4 text-lg bg-blue-500" />
```

---

## 🔍 ESLint Usage (Recommended)

### 1. Add plugin

In your `.eslintrc.json`:

```json
{
  "plugins": ["tailwind-cleaner"],
  "rules": {
    "tailwind-cleaner/no-conflicts": "warn"
  }
}
```

---

### 2. Run ESLint

```bash
npx eslint . --fix
```

---

### 💡 Result

* Shows warnings in editor
* Auto-fixes on save / fix

---

## ⚡ Babel Usage (Build-time Optimization)

Add to your Babel config:

```json
{
  "plugins": ["tailwind-class-cleaner/babel"]
}
```

---

## ⚠️ Limitations (v1)

* Only supports static strings:

```jsx
className="p-2 p-4"
```

* Does NOT yet support:

  * template literals
  * classnames()
  * conditional classes

---

## 🔭 Roadmap

* Support for template literals
* px vs p conflict handling
* Tailwind config awareness
* Vite plugin

---

## 📄 License

MIT

