export const msalConfig = {
  auth: {
    clientId: "f5cbce86-8372-4a69-8781-11336a2234c1",
    authority: "https://login.microsoftonline.com/aad40625-99f6-4630-8b76-2ef3f399364b",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};