
var isEven = v => (v & 1) === 0;
var isOdd = v => (v & 1) === 1;

var indexFound = (arr , valueToSearch) => Array.isArray(arr) ? Boolean(~arr.indexOf(valueToSearch)) : false;

// Color RGB hexadecimal

// (binary) => 11111111 00100011 00010100

//    (red) => 11111111 => ff => 255
//  (green) => 00100011 => 23 => 35
//   (blue) => 00010100 => 14 => 20

//    (hex) => ff2314

// (red) => 255 => 00000000 00000000 00000000 11111111
// (green) =>  35 => 00000000 00000000 00000000 00100011
//  (blue) =>  20 => 00000000 00000000 00000000 00010100

// example : rgbToHexa(232, 61, 49) = #e83d31
var rgbToHexa = (red = 0 , green = 0 , blue = 0) => `#${(red << 16 | green << 8 | blue).toString(16)}`

// example : hexaToRgb("#e83d31") => (232, 61, 49)
var hexaToRgb = hex => {
  hex = hex.replace(/^#?([0-9a-f]{6})$/i, '$1');
  hex = Number(`0x${hex}`);

  return [
    hex >> 16 & 0xff , //red
    hex >> 8 & 0xff, // green
    hex & 0xff // blue
  ]
}


// Suppose we have created a function which will take an option object and depending upon the input value 
// it will behave...

const LIST_FRACTION = 0x1; // (001)
const LIST_UNIQUE = 0x2;   // (010)
const LIST_SORTED = 0x4;   // (100)
const LIST_ALL = LIST_FRACTION | LIST_UNIQUE | LIST_SORTED; // (111)

const LIST_DEFAULT = LIST_ALL ^ LIST_UNIQUE; // (101)

function normalizeList (list, flag = LIST_DEFAULT) {
  if (flag & LIST_FRACTION) {
    const max = Math.max(...list);
    list = list.map(value => Number((value / max).toFixed(2)));
  }
  if (flag & LIST_UNIQUE) {
    list = [...new Set(list)];
  }
  if (flag & LIST_SORTED) {
    list = list.sort((a, b) => a - b);
  }
  return list;
}