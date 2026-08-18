export function buildApiUrl(path) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (codespaceName && codespaceName.trim() !== '') {
    return `https://${codespaceName.trim()}-8000.app.github.dev/api${normalizedPath}/`;
  }

  return `http://localhost:8000/api${normalizedPath}/`;
}
