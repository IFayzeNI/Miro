import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { publicFetchClient } from "../api/instance";

type Session = {
  userId: string;
  email: string;
  exp: number;
  iat: number;
};

const TOKEN_KEY = "token";

let refreshTokenPromise: Promise<string | null> | null = null;

interface SessionState {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  refreshToken: () => Promise<string | null>;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  token: localStorage.getItem(TOKEN_KEY),

  login: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    set({ token });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ token: null });
  },

  refreshToken: async () => {
    const { token, login, logout } = get();

    if (!token) {
      return null;
    }

    const session = jwtDecode<Session>(token);

    if (session.exp < Date.now() / 1000) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = publicFetchClient
          .POST("/auth/refresh")
          .then((r) => r.data?.accessToken ?? null)
          .then((newToken) => {
            if (newToken) {
              login(newToken);
              return newToken;
            } else {
              logout();
              return null;
            }
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      const newToken = await refreshTokenPromise;

      if (newToken) {
        return newToken;
      } else {
        return null;
      }
    }

    return token;
  },
}));

export const useSession = () => {
  const { login, logout, refreshToken, token } = useSessionStore(
    (state) => state,
  );
  const session = token ? jwtDecode<Session>(token) : null;

  return { refreshToken, login, logout, session, token };
};
