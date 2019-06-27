Object.prototype.dump = function() {
	console.log(JSON.stringify(this, null, 2));
};

function Node(value) {
	this.data = value;
	this.left = null;
	this.right = null;
}

function BinarySearchTree(rootValue) {
	const _root = new Node(rootValue);

	const insert = value => {
		let currentNode = _root;
		const newValue = new Node(value);
		while (currentNode) {
			if (currentNode.data > newValue.data) {
				if (!currentNode.left) {
					currentNode.left = newValue;
					currentNode = null;
				} else {
					currentNode = currentNode.left;
				}
			} else {
				if (!currentNode.right) {
					currentNode.right = newValue;
					currentNode = null;
				} else {
					currentNode = currentNode.right;
				}
			}
		}
	};

	const minNode = node => {
		if (!node) return 0;
		if (node.left) return minNode(node.left);
		return node.data;
	};

	const maxNode = node => {
		if (!node) return 0;
		if (node.right) return maxNode(node.right);
		return node.data;
	};

	const height = node => {
		if (!node) return 0;
		const leftHeight = height(node.left);
		const rightHeight = height(node.right);
		return Math.max(leftHeight , rightHeight) + 1;
	}


	const isTreeBalanced = node => {
		if (!node) return true;
		const leftHeight = height(node.left) ;
		const rightHeight = height(node.right);
		console.log(leftHeight, rightHeight)
		return Math.abs(height(node.left) - height(node.right)) <= 1;
	}

	this.insert = insert;
	this.dump = () => _root.dump();
	this.minNode = minNode;
	this.maxNode = maxNode;
	this.binaryTree = _root;
	this.height = height;
	this.isTreeBalanced = isTreeBalanced;

	return this;
};

const tree = new BinarySearchTree(14);
tree.insert(8);
tree.insert(9);
tree.insert(4);
tree.insert(-9);
tree.insert(29);
 tree.insert(-9);
tree.insert(129);
tree.dump();

console.log(tree.minNode(tree.binaryTree));

console.log(tree.maxNode(tree.binaryTree));
console.log(tree.height(tree.binaryTree));

console.log(tree.isTreeBalanced(tree.binaryTree))