import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://id.nepalinames.com',

  redirectUri: window.location.origin + '/home',

  // URL of the SPA to redirect the user after silent refresh
  useSilentRefresh: true,

  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'js',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile',
  postLogoutRedirectUri: 'http://localhost:4200',
  // silentRefreshShowIFrame: true,

  showDebugInformation: true,

  sessionChecksEnabled: true,
  responseType: 'code',
  clearHashAfterLogin: false,
  nonceStateSeparator: 'semicolon',
  // timeoutFactor: 0.01,
};
