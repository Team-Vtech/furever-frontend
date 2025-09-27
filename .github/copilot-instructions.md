---
applyTo: '**'
---

## 1. Business context

Furever is a pet care platform connecting pet owners with trusted pet sitters and walkers. The platform includes a web app for pet owners to book services, manage their pets, and communicate with sitters, as well as an admin dashboard for managing users, bookings, and payments.

Packages in the monorepo:

- `apps/web` - The website that will have the pet-user routes.
- `apps/admin` - The admin dashboard for managing the platform.
- `packages/eslint-config` - ESLint configuration package.
- `packages/typescript-config` - TypeScript configuration package.
- `packages/types` - Shared TypeScript types.
- `packages/ui` - Shared UI components and design system.

## 2. Directory conventions

1. Each package owns its own `package.json`, `tsconfig.json`, `CHANGELOG.md`.
2. Source lives in `src/`, except Next.js which uses `app/`.
3. **Feature-first** layout inside `apps/<type-of-user>/app/featured/<feature>/`:
   - `constants.ts` - domain constants/enums.
   - `clients/` - HTTP / SDK wrappers.
   - `components/` - stateless UI atoms/molecules.
   - `screens/` - page-level compositions rendered by routes each one of screen should be named in **PascalCase** (e.g. `PetProfileScreen/PetProfileScreen.tsx`) and inside each screen have package.json file will include just main key with the name of component.
   - `containers/` - smart components wiring data to presentation like forms.
   - `hooks/`, `utils/`, `types/` - as names imply.
4. Admin code path: `apps/admin`; customer-facing path: `apps/web`.
5. Never use a barrel `index.ts`; external code should import from the files directly.

## 3. Naming conventions

- React components & folders: **PascalCase** (`CreateUserScreen.tsx`).
- Custom hooks: **camelCase** with `use` prefix (`useUsersQuery`).
- Utility/constant files: **kebab-case** ending with `.utils.ts`, `.constants.ts`.
- CLI scripts: **kebab-case**.
- API route files: `apps/<type-of-user>/app/api/<group>/<name>/route.ts` exporting `GET`/`POST`/etc.
- Tests: colocated in **tests** dir `<file>.test.ts(x)`.

## 4. API & data layer patterns

- Never call `fetch` directly in components; create a **feature-scoped client** in `clients/` using `$http` our http client utility.
- Validate **all** request bodies & query params with **zod** both server & client.
- Server handlers must wrap errors using helpers in `packages/<type-of-user>/app/utils/error.utils.ts` (`ValidationError`, `NotAuthorized`, `PrismaError`).

## 5. React/UI patterns

- For admin every components should be under `apps/<type-of-user>/app/admin/`
- Design system: **Shadcn UI** with custom theme (`packages/ui`). **Only** use Tailwind.
- State sync: **@tanstack/react-query**. Provide hooks under `hooks/` for each feature.
- All pages wrapped with global providers located in `apps/<type-of-user>/app/components/*Provider`.
- All form validation must use **zod** schemas defined in `apps/<type-of-user>/app/api/<group>/<name>/<schema>.schema.ts`.
- Don't call `fetch` directly in components; use the feature-scoped client instead.
- Always call Next.js backend API routes using the `$http` client.
- Don't call external services directly from client side; call Next.js backend and backend will call the external services.
- Don't create summary documentation file

## 8. AI edit enforcement rules

1. **Respect** structure & naming conventions above.
2. **Never** duplicate utilities; import existing modules.
3. All new code must compile under `tsc --noEmit --strict`.
4. Ensure ESLint & Prettier pass (`npm run lint` / `npm run format`).
5. Business logic should be pure; side-effects belong in clients/services.
6. Handle errors exhaustively using shared helpers.
