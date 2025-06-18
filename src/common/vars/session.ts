import { createPersistentVar } from "@/common/apollo/persistent-var";

export type Session = {
  userId: string;
  authToken: string;
};

export const [session, loadSession] = createPersistentVar<Session | null>(
  "session",
  null,
);
