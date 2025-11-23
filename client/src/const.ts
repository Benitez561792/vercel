// Constantes da aplicação
export const COOKIE_NAME = "wellwork_session";
export const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "WellWork System";
export const APP_LOGO = "https://placehold.co/128x128/06B6D4/FFFFFF?text=W";

export const API_JAVA_URL = import.meta.env.VITE_API_JAVA_URL || "http://localhost:8080/api";

export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  
  if (!oauthPortalUrl || !appId) {
    return "/login";
  }
  
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);
  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");
  return url.toString();
};
