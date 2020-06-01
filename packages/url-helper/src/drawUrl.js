/**
 * protocol :// hostname[:port] / path / [;parameters][?query]#fragment
 * @param {string} base - hostname
 * @param {Object} params
 * @param {Object} rest
 * @param {string} rest.protocol
 * @param {string} rest.port
 * @param {Array|string} rest.path
 * @param {string} rest.fragment
 * @return {string}
 */

const drawUrl = (
  base,
  params,
  { protocol = 'http', port, path, fragment } = {}
) => {
  let url = base
  if (protocol) url = protocol + '://' + url
  if (port) url += ':' + port
  if (path) url += '/' + (Array.isArray(path) ? path.join('/') : String(path))
  if (params) url += '?' + Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')
  if (fragment) url += '#' + fragment
  return url
}

export { drawUrl }


