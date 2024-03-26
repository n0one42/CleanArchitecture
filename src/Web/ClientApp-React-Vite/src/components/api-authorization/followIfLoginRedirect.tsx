export default function followIfLoginRedirect(response: Response) {
  // Use process.env.PUBLIC_URL to get the base URL
  const baseUrl = __BACKEND_URL__ || ""; // Fallback to empty string if not defined
  const loginUrl = `${baseUrl}/Identity/Account/Login`;

  if (response.redirected && response.url.startsWith(loginUrl)) {
    window.location.href = `${loginUrl}?ReturnUrl=${encodeURIComponent(
      window.location.pathname
    )}`;
  }
}
