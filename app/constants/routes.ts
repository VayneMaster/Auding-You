// app/constants/routes.ts

// All valid routes in your app
export const validPaths = [
  // bottom tabs (within tabs group)
  "/(tabs)",
  "/(tabs)/Connect",
  "/(tabs)/Farm",
  "/(tabs)/Research",

  // extra screens (root-level files)
  "/brainwaker",
  "/wins",
  "/taskling",
  "/hobbies",
  "/reminders",
] as const;

// Union type of valid route strings
export type ValidPath = (typeof validPaths)[number];

/**
 * Runtime type guard: checks if a string is a ValidPath
 */
export function isValidPath(p: string): p is ValidPath {
  return (validPaths as readonly string[]).includes(p);
}

/**
 * Returns true if a path is one of the bottom tabs
 */
export function isTabPath(p: string): p is Extract<ValidPath, `/(tabs)${string}`> {
  return p.startsWith("/(tabs)");
}
