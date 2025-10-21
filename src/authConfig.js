export const msalConfig = {
  auth: {
    //clientId: "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
    //authority: "https://login.microsoftonline.com/xxxxxxxxxxxxxxxxx",
    //redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};