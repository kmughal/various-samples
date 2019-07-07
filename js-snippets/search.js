String.prototype.print = function(label = null) {
	let labelText = "";
	if (typeof label === "function") {
		let labelFunc = label;
		labelText = labelFunc(this);
	} else labelText = `${label ? label + ":" : ""}`;
	console.log(labelText || "", JSON.stringify(this, null, 2));
};

function linearSearch(arr, valueToSearch) {
	for (let index in arr) {
		if (arr[index] === valueToSearch) return index;
	}
	return -1;
}

const pipe = arr =>
	Array.isArray(arr)
		? arr.reduce((previousItem, currentItem) => currentItem(previousItem), {})
		: null;

function binarySearch(arr, valueToSearch, start, end) {
	if (start > end) return false;
	const mid = Math.floor((start + end) / 2);
	if (arr[mid] === valueToSearch) return true;
	if (arr[mid] > valueToSearch)
		return binarySearch(arr, valueToSearch, start, mid - 1);
	else return binarySearch(arr, valueToSearch, mid + 1, end);
}

linearSearch([4, 5, 6, 7, 8, 23], 23)
	.toString()
	.print("index");

let arr = [3, 5, 3, -9, 234, 90, 0].sort();
binarySearch(arr, 3, 0, arr.length - 1)
	.toString()
	.print(value =>
		value.valueOf() === "true"
			? "Found at index :"
			: "value not found so result is false!"
	);

pipe([
	() => binarySearch(arr, 3, 0, arr.length - 1),
	value => (value ? "value found" : "value not found"),
	console.log
]);
