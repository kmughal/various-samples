const html = `
 <div>
  <section>
    <label>hello</label>
  </section>
  <span>great test</span>
  <p>hello again ok</p>
 </div>
`
const bigResult = []
function loopUntil (h, i, pred) {
  while (pred(h[i])) {
    i++
  }
  return i
}

function next (ch, i) {
  return ch[i + 1]
}

function extractProps (arr) {
  const splitter = v => v.split('=')
  const ret = {}
  arr.map(v => {
    const parts = splitter(v)
    ret[parts[0]] = parts[1]
  })
  return ret
}

const START_TAG = '<'
const END_TAG = '>'
const FRONT_SLASH = '/'

function getTagAndProps (ch, i, html) {
  if (ch === START_TAG && next(html, i) !== FRONT_SLASH) {
    let newIndex = loopUntil(html, i, ch => ch !== END_TAG)

    let tagName = String(html).substring(i + 1, newIndex)

    i = newIndex
    let parts = tagName.split(' ')
    const j = {}

    j.tag = parts[0]
    j.props = extractProps(parts.splice(1))

    return [newIndex, j]
  }
  return [i, void 0]
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
