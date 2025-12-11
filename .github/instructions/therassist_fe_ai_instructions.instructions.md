---
applyTo: "**"
---

Always follow these rules when generating or modifying code in this repository:

1. Reuse Before Creating New Code

Before generating any new component, utility, hook, or service:
search the existing codebase for an existing solution.

If an equivalent or similar solution exists, ALWAYS reuse it rather than creating a new one.

Do not duplicate code, components, hooks, utils, API wrappers, or styles.

2. Component Rules (Important)

When generating UI components:

Check if the component already exists in the codebase.

If exists → reuse it. Do not redefine a new component or design.

If no existing component is found → use the shadcn/ui equivalent. Refer to this Link on getting info about existing shadcn/ui components: "https://ui.shadcn.com/docs/components"

If shadcn/ui does not have a suitable component → implement your own minimal custom component.

Follow the existing design system, Tailwind tokens, spacing, and naming conventions.

3. Follow the Existing Architecture

Respect the project’s folder structure and architecture (e.g., Domain-Driven Design if used):

Place files only in their appropriate domain/module folders.

Keep business logic in domain/service layers.

Keep UI logic in UI layers.

Never introduce new architectural patterns unless explicitly requested.

4. Naming Conventions

Follow consistent naming:

Components → PascalCase

Functions, hooks, utils → camelCase

Files → kebab-case or match project’s existing convention

Types/interfaces → PascalCase

Do not add random or new naming schemes.

5. Use the Existing Tech Stack Only

Never introduce new libraries or technologies unless asked for.
Use only the stack already present in the project. Examples:

React + Next.js (if applicable)

TypeScript

TailwindCSS

shadcn/ui

Existing utility functions (e.g., cn, fetcher, formatDate)

If unsure whether a package is installed → ask or check first.

6. UI/UX & Styling Rules

Always use existing design tokens, Tailwind spacing, colors, and font sizes.

Prefer shadcn/ui components before writing custom ones.

Avoid inline styles unless explicitly required.

Keep UI consistent with the rest of the codebase.

7. Avoid Overengineering

Do not introduce complex patterns unless the project already uses them.

Keep abstractions simple and consistent with existing code.

Avoid unnecessary factories, adapters, layers, generics, or excessive interfaces.

8. No Hallucinated APIs or Functions

Only call functions, endpoints, hooks, or utilities that exist in the codebase.

If uncertain whether something exists → check first or ask.

Do not invent library methods that don’t exist.

9. Error Handling & Validation

Always include proper error handling for network calls and async operations.

Respect existing patterns (e.g., Zod schemas, try/catch style, error boundaries).

10. State Management Consistency

Follow the project’s method for managing state:

If using React Query → use mutations, queries, invalidations.

If using Zustand/Redux → use store patterns consistently.

Do not introduce new state libraries.

11. Code Should Compile

Ensure:

Imports are correct

Types match function signatures

Your code passes TypeScript checks

No undefined variables or missing exports

12. Ask When Ambiguous

If something is unclear (component existence, API shape, folder location),
ask for clarification before generating code.

13. Prefer Minimal Changes

When modifying files:

Keep diffs small and targeted.

Do not refactor unrelated parts.

Maintain the current style & patterns.
