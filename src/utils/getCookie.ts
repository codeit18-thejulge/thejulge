export const getCookieValue = (cookie: string | undefined, key: string) => {
  if (!cookie) {
    return undefined;
  }

  const cookies = cookie.split(";");

  for (const item of cookies) {
    const [current, value] = item.trim().split("=");

    if (current === key) {
      return value;
    }
  }

  return undefined;
};
