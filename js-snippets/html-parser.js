const html = `
 <form>
 <section>
 <label>name</label>
 <input type="text"/>
 </section>
 <section>
 <label>age</label>
 <input type="text" onClick="great_work"/>
 </section>
 </form>
`

function loopUntil (h, i, pred) {
  return pred(h[i], i, h) ? loopUntil(h, ++i, pred) : i
}

function next (ch, i) {
  return ch[i + 1]
}

function extractProps (arr) {
  return arr.reduce((p, c) => {
    const parts = c.split('=')
    p[parts[0]] = parts[1]
    return p
  }, {})
}

const START_TAG = '<'
const END_TAG = '>'
const FRONT_SLASH = '/'

function getTagAndProps (ch, i, html) {
  const startOfTag = ch === START_TAG && next(html, i) !== FRONT_SLASH
  if (!startOfTag) return [i, void 0]

  let newIndex = loopUntil(html, i, ch => ch !== END_TAG)

  let tagName = String(html).substring(i + 1, newIndex)

  i = newIndex

  let parts = tagName.split(' ')

  const j = {}
  j.tag = parts[0]
  j.props = extractProps(parts.splice(1))

  return [newIndex, j]
}

function extractTheBody (html, i, node) {
  const fullendtag = `</${node.tag}>`

  let k = i
  for (; k < html.length; k++) {
    const item = html.substr(k, fullendtag.length)
    if (item === fullendtag) {
      break
    }
  }

  const parts = html.substring(i, k)
  const d = parser(parts)

  node.children = d
  return [k, parts]
}

function parser (html) {
  let r = []

  for (let i = 0; i < html.length; i++) {
    let ch = html[i]
    let j = void 0
    let k = getTagAndProps(ch, i, html)
    i = k[0]
    if (k[1] !== void 0) {
      // means now we need to extract the innerhtml
      i = i + 1
      const tag = k[1].tag
      const p = extractTheBody(html, i, k[1])
      i = p[0]
      k[1].innerHtml = p[1]
      r.push(k[1])
    }
  }
  return r
}

const result = parser(html)
console.log(JSON.stringify(result, null, 2))

const json = {
  input: html,
  result
}
require('fs').writeFileSync('output.json', JSON.stringify(json, null, 2))
