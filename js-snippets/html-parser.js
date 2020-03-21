function loopUntil (h, i, pred) {
  return pred(h[i], i, h) ? loopUntil(h, ++i, pred) : i
}

function next (ch, i) {
  return ch[i + 1]
}

function extractProps (propsString) {
  propsString = String(propsString)
  const p = /=/g
  const splitLocs = []
  while ((m = p.exec(propsString))) {
    let end = m.index
    let start = propsString.lastIndexOf(' ', end)
    start = start === -1 ? 0 : start
    splitLocs.push({ start, end })
  }

  const props = []
  splitLocs.forEach((v, i) => {
    let propName = propsString.substring(v.start, v.end)
    let last = splitLocs[i + 1] ? splitLocs[i + 1].start : propsString.length
    let propValue = String(propsString).substring(v.end + 2, last - 1)
    props.push({ [propName.replace(' ', '')]: propValue })
  })
  return props
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
  j.props = extractProps(tagName.replace(j.tag, ''))

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

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`Enter a web address to pull down html :`, url => {
  console.log('You entered : ', url)
  require('https').get(url, res => {
    var data = []
    res.on('data', chunk => data.push(chunk))
    res.on('end', function () {
      const fullHtml = Buffer.concat(data).toString('utf-8')

      const result = parser(fullHtml)

      const json = JSON.stringify({
        input: fullHtml,
        result
      })

      require('fs').writeFileSync('output.json', json)
    })
  })
  readline.close()
})
