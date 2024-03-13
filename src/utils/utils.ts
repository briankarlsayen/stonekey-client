const getRandomString = () => {
  return Math.random().toString(36).substring(2, 15);
};

export async function checkOnline() {
  if (!window.navigator.onLine) return false;

  // avoid CORS errors with a request to your own origin
  const ownWebSite = "https://note-app-server.fly.dev";
  const url = new URL(ownWebSite);

  // random value to prevent cached responses
  url.searchParams.set("rand", getRandomString());

  try {
    const response = await fetch(url.toString(), { method: "HEAD" });

    return response.ok;
  } catch {
    return false;
  }
}
