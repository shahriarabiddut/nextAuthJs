# Understanding `--force` and `--legacy-peer-deps` in npm

When installing packages with `npm`, you may encounter dependency conflicts.  
Two common flags to handle these are:

## `--force`

Forces installation, **ignoring dependency conflicts**.  
⚠️ **Warning:** This can break your project by overriding package versions.

### Example:

```sh
npm install package-a --force
```

**Scenario:**

- `package-a` requires `React 17`, but you have `React 18`.
- `--force` will install `package-a` anyway, potentially causing issues.

---

## `--legacy-peer-deps`

Skips strict **peer dependency checks**, allowing installation even if dependencies don’t match.  
✅ **Safer than `--force`, but still use with caution.**

### Example:

```sh
npm install package-b --legacy-peer-deps
```

**Scenario:**

- `package-b` requires `React 16`, but you have `React 18`.
- `--legacy-peer-deps` installs `package-b` **without forcing React 16**.

---

## When to Use?

- **Try `--legacy-peer-deps` first.**
- If that fails, **use `--force` as a last resort**.

📌 **Always test your project after using these flags to avoid breaking changes!**

## Not Counted As Route

Underscore FolderName (`_foldername`) doesn't count as a route in nextJs.

## Locally Run This?! Here How

First,

Download and `npm i` hit enter.
Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
