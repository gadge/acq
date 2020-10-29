export const dockUrl = (base, url) => {
  if (base) {
    if (base.endsWith('/')) base = base.slice(0, -1)
    if (url.startsWith('/')) url = url.slice(1)
    url = base + '/' + url
  }
  return url
}
