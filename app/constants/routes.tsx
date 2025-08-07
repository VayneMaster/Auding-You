export const validPaths = [
  "/brainwaker",
  "/wins",
  "/farm",
  "/connect",
  "/taskling",
  "/hobbies",
  "/reminders",
] as const;

export type ValidPath = typeof validPaths[number];
