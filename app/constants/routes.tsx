export const validPaths = [
  "/",
  "/brainwaker",
  "/wins",
  "/farm",
  "/connect",
  "/taskling",
  "/hobbies",
  "/reminders",
  "/Research",
] as const;

export type ValidPath = typeof validPaths[number];
