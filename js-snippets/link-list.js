Object.prototype.print = function() {
	console.log(JSON.stringify(this,null,2));
}

String.prototype.print = function() {
	console.log(this);
}

function Node(value) {
	this.value = value;
	this.nextNode = null;
}

function invarient(condition, message) {
	if (condition) {
		throw new Error(message);
	}
}


const emptyNode = null;
Object.freeze(emptyNode);

function LinkList() {
	const _self = this;
	let _node = emptyNode;
	let _head = null;
	let _totalItems = 0;
	let _tail = null;

	const _insert = (node, parent) => {
		if (!parent) {
			_head = _tail = node;
			_node = node;
			return;
		}

		if (!parent.nextNode) {
			parent.nextNode = node;
			_tail = node;
			return;
		}
		_insert(node, parent.nextNode);
	};

	const _addNode = value => {
		const newNode = new Node();
		newNode.value = value;
		newNode.nextNode = emptyNode;

		_insert(newNode, _node);
		_totalItems++;
	};

	const _get = (index, currentIndex, node) => {
		_validateIndex(index);
		if (index === currentIndex) return node;
		if (index > currentIndex) return _get(index, ++currentIndex, node.nextNode);
	};

	const _validateIndex = index =>
		invarient(index < 0 || index > _totalItems, "invalid index");

	const _deleteNode = index => _delete(index, 0, _node);
	const _print = () => console.log(JSON.stringify(_node, null, 2));
	const _getNode = index => _get(index, 0, _node);

	const _delete = (index, counter, node) => {
		_validateIndex(index);

		let nextNode, previousNode;
		if (index === 0) {
			nextNode = _getNode(index + 1);
			_node = nextNode;
		} else if (index + 1 === _totalItems) {
			currentNode = _getNode(index);
			_node = _getNode(index - 1);
		} else {
			nextNode = _getNode(index + 1);
			previousNode = _getNode(index - 1);
			previousNode.nextNode = nextNode;
			_node = previousNode;
		}
		return _getNode(index);
	};

	this.print = _print;
	this.delete = _deleteNode;
	this.get = _getNode;
	this.insert = _addNode;
	this.getHead = () => _head;
	this.getTail = () => _tail;
	this.getTotalItems = () => _totalItems;
	return this;
}

const list = new LinkList();
list.insert(3);
list.insert(4);
list.insert(15);
list.insert(25);
list.insert(35);
"search node:".print();
list.get(1).print();
"before delete:".print();
list.print();
list.delete(2);
console.log("after delete:");
list.print();
"getHead".print();
list.getHead().print();
"getTail".print();
list.getTail().print();
"totalItems".print();
list.getTotalItems().print();