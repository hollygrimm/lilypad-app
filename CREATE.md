

```
npx create-next-app@latest lilypad-app --example with-redux
cd lilypad-app
```

```
npm install -D tailwindcss postcss autoprefixer 
npx tailwindcss init -p
```

add to `tailwind.config.js`:
```
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
```

Add the @tailwind directives for each of Tailwind’s layers to your app/styles/globals.css file.
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## TODO

- "moduleResolution": "bundler", in tsconfig.json


## References
https://tailwindcss.com/docs/guides/nextjs

