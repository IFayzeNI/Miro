import { enableMocking } from "@/shared/api/mocks";
import { ROUTES } from "@/shared/model/routes";
import { useSessionStore } from "@/shared/model/session";
import { redirect } from "react-router-dom";

export async function protectedLoader() {
  await enableMocking();
  const token = await useSessionStore.getState().refreshToken();

  if (!token) {
    return redirect(ROUTES.LOGIN);
  }

  return null;
}
