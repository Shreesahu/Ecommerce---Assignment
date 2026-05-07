# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



src/
│
├── app/                # Redux store setup
│   └── store.ts
│
├── api/                # Axios + API calls
│   ├── axios.ts
│   └── userApi.ts
│
├── features/           # Redux slices (by feature)
│   └── user/
│       ├── userSlice.ts
│       └── userTypes.ts
│
├── pages/              # Route-level pages
│   ├── Home.tsx
│   ├── Login.tsx
│   └── Dashboard.tsx
│
├── components/         # Reusable UI components
│   ├── Navbar.tsx
│   └── Loader.tsx
│
├── routes/             # Routing config
│   └── AppRoutes.tsx
│
├── hooks/              # Custom hooks
│   └── useAppDispatch.ts
│
├── types/              # Global types
│   └── index.ts
│
├── utils/              # Helpers
│   └── constants.ts
│
├── App.tsx
├── main.tsx
└── index.css