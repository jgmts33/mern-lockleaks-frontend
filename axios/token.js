import axios from "axios";
import { ENDPOINT } from "../config/config";
import { jwtDecode } from "jwt-decode";

export const getCookieValue = (name) => {
  const matches = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return matches ? decodeURIComponent(matches[2]) : null;
};

export const setTokens = (tokens) => {
  const accessExpireDate = new Date(tokens.access.expires).toUTCString();
  const refreshExpireDate = new Date(tokens.refresh.expires).toUTCString(); // Assuming similar format for refresh token
  document.cookie = `access=${encodeURIComponent(JSON.stringify(tokens.access))}; expires=${accessExpireDate}; path=/`;
  document.cookie = `refresh=${encodeURIComponent(JSON.stringify(tokens.refresh))}; expires=${refreshExpireDate}; path=/`;
};

export const setTokensExpired = () => {
  document.cookie = `access=; expires=${new Date("1970-01-01")}; path=/`;
  document.cookie = `refresh=; expires=${new Date("1970-01-01")}; path=/`;
}

const refreshTokenValue = async (refreshToken) => {
  try {
    const response = await axios.post(`${ENDPOINT}/auth/refresh-token`, {
      refreshToken: refreshToken,
    });
    const { access, refresh } = response.data;
    const tokens = { access, refresh };

    setTokens(tokens);

    return tokens;
  } catch (error) {
    console.log("refresh token error : ", error);
    throw error;
  }
};

export const getAccessToken = async () => {
  let access = getCookieValue('access');
  let refresh = getCookieValue('refresh');

  let tokens = {
    access: access ? JSON.parse(access) : null,
    refresh: refresh ? JSON.parse(refresh) : null,
  };

  const isTokenExpired = (expires) => new Date(expires) < new Date();

  if (!tokens.access || isTokenExpired(tokens.access.expires)) {
    if (tokens.refresh && !isTokenExpired(tokens.refresh.expires)) {
      try {
        // @ts-ignore
        tokens = await refreshTokenValue(tokens.refresh.token);
      } catch (error) {


        if (window.location.pathname !== '/auth/login') {
          if (window.location.pathname.includes("admin")) {
            window.location.replace("/213219eksaodksaokdwqsa/login")
          }
          if (window.location.pathname.includes("app")) {
            
          }
        }
        return null;
      }
    } else {
      if (window.location.pathname !== '/auth/login') {
        if (window.location.pathname.includes("admin")) {
          window.location.replace("/213219eksaodksaokdwqsa/login")
        }
        if (window.location.pathname.includes("app")) {
          window.location.replace("/auth/login")
        }
      }
      return null;
    }
  }

  return tokens.access.token;
};

export const getUserId = () => {
  let access = getCookieValue('access') || '';
  if (!access) return '';
  const { id } = jwtDecode(access);
  return id ? id : '';
}