import { completeCreatorOnboardingFn } from "#/server/profile.complete-creator-onboarding";
import { getAuthStore } from "#/store/auth-store";

export async function completeCreatorOnboarding() {
  await completeCreatorOnboardingFn();
  const store = getAuthStore();
  const user = store.getState().user;
  if (user) {
    store.getState().setUser({ ...user, creatorOnboarded: true });
  }
}
