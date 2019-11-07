// Given an array of strings, group anagrams together.
// Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
// Output:
// [
//   ["ate","eat","tea"],
//   ["nat","tan"],
//   ["bat"]
// ]

const input = ["eat", "tea", "tan", "ate", "nat", "bat"];

const getListOfStringAndAsciiCodes = input => {
  const result = [];
  input.forEach(str => {
    let asciiCode = str
      .split("")
      .map(i => i.charCodeAt(0))
      .reduce((prev, curr) => prev + curr, 0);
    result.push({ str, asciiCode });
  });
  return result;
};

const orderListByAsciiCodes = arr =>
  arr.sort((a, b) => a.asciiCode - b.asciiCode);

const prepareFinalResult = arr => {
  let temp = [];
  const final = [];
  let prev = -1;
  for (let i of arr) {
    if (prev === -1) prev = i.asciiCode;
    if (prev === i.asciiCode) {
      temp.push(i.str);
    } else if (prev !== i.asciiCode) {
      final.push(temp);
      temp = [];
      prev = i.asciiCode;
      temp.push(i.str);
    }
  }
  final.push(temp);
  return final;
};

const buildResult = input => {
  const listWithAsciiCodes = getListOfStringAndAsciiCodes(input);
  const orderedList = orderListByAsciiCodes(listWithAsciiCodes);
  const result = prepareFinalResult(orderedList);
  return result;
};

console.log(buildResult(input));
