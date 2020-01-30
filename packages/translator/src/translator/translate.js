export const translate = (word, dict) => {
  for (let [_fr, _to] of dict) word = word.replace(_fr, _to)
  return word.trim()
}
