export const urlBuilder = (url, params) => {
  if (!params) return url
  const p = Object.entries(params).map(([k, v]) => `${k}=${v}`).join('\&')
  return url + '?' + p
}
