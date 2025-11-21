# Frontend Architecture & Coding Guidelines

## 1. Tech Stack

- **Framework:** React 18+ (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Utility-first)
- **State Management (Server):** TanStack Query v5 (React Query) - CRITICAL.
- **State Management (Client):** React Context API (for Auth only).
- **Routing:** React Router DOM v6.
- **HTTP Client:** Axios.
- **Real-time:** Socket.io-client.

## 2. Core Principles

- **Data Fetching:** - NEVER use `useEffect` for fetching data. Always use `useQuery`.
  - NEVER manually manage `isLoading` or `error` states for API calls. Let `useQuery` handle it.
  - Use `useMutation` for POST/PUT/DELETE.
- **Authorization:**
  - Store JWT in `localStorage`.
  - Use an Axios Interceptor in `src/api/axios.ts` to attach `Authorization: Bearer token` to every request.
  - Wrap protected routes in a `<PrivateRoute>` component that checks the AuthContext.
- **Styling:**
  - No `.css` files (except `index.css`). Use Tailwind classes directly in JSX.
  - For complex class logic, use `clsx` or `tailwind-merge`.

## 3. Component Structure

- **Named Exports:** Use `export const ComponentName = () => {}`, not default exports.
- **Props:** Define a `Props` interface for every component.
- **Separation:** - `features/*` contains "Smart" components (connected to API).
  - `components/ui/*` contains "Dumb" components (visuals only, receive props).

## 4. Real-time Logs (WebSockets)

- Create a custom hook `useEventStream` to handle the Socket.io connection.
- Ensure the socket connects ONLY when the user is logged in.
- Ensure the socket disconnects (clean up) when the component unmounts.

## 5. Environment

- Use `import.meta.env.VITE_API_URL` for the backend URL.
