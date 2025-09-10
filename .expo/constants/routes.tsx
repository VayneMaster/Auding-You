// app/constants/routes.tsx

// Centralized valid paths for navigation
export const paths = {
  // bottom tab routes
  home: "/",
  connect: "/Connect",
  farm: "/Farm",
  research: "/Research",

  // feature screens (outside of tabs)
  brainwaker: "/brainwaker",
  wins: "/wins",
  taskling: "/taskling",
  hobbies: "/hobbies",
  reminders: "/reminders",
} as const;

// All routes
export type ValidPath = (typeof paths)[keyof typeof paths];

// Tab-only routes
export type TabPath =
  | typeof paths.home
  | typeof paths.connect
  | typeof paths.farm
  | typeof paths.research;

/**
 * Utility: check if a path belongs to the bottom tab navigator
 */
export function isTabPath(path: ValidPath): path is TabPath {
  return [
    paths.home,
    paths.connect,
    paths.farm,
    paths.research,
  ].includes(path as TabPath);
}
