self.__MIDDLEWARE_MATCHERS = [
  {
    "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|_vercel|.*\\..*).*))(\\.json)?[\\/#\\?]?$",
    "originalSource": "/((?!_next|_vercel|.*\\..*).*)"
  }
];self.__MIDDLEWARE_MATCHERS_CB && self.__MIDDLEWARE_MATCHERS_CB()