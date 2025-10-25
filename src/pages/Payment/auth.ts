// auth.ts
import * as fcl from "@blocto/fcl";

export async function ensureAuthStrict() {
  await fcl.unauthenticate();
  await fcl.authenticate();
  const u = await fcl.currentUser.snapshot();
  if (!u?.addr) throw new Error("No Flow address after login");
}

function isInvalidSession(e: unknown) {
  const msg = (
    typeof e === "string"
      ? e
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (e as any)?.body?.message || (e as any)?.message || ""
  )
    .toString()
    .toLowerCase();
  return (
    msg.includes("invalid_session_id") ||
    msg.includes("unauthorized") ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e as any)?.response?.status === 401
  );
}

export async function mutateWithReauth(
  build: () => Parameters<typeof fcl.mutate>[0],
) {
  try {
    return await fcl.mutate(build());
  } catch (e) {
    if (isInvalidSession(e)) {
      await fcl.unauthenticate();
      await fcl.authenticate();
      return await fcl.mutate(build());
    }
    throw e;
  }
}
