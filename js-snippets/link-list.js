function Node(value) {
	this.value = value;
	this.nextNode = null;
}

function LinkList() {
	var _node = null;

	const _insert = (node, parent) => {
		if (!parent) {
			_node = node;
			return;
		}

		if (!parent.nextNode) {
			parent.nextNode = node;
			return;
		}
		_insert(node, parent.nextNode);
	};

	this.insert = value => {
		const newNode = new Node();
		newNode.value = value;
		newNode.nextNode = null;

		_insert(newNode, _node);
	};

	this.print = () => console.log(JSON.stringify(_node, null, 2));
}

const list = new LinkList();

list.insert(3);
list.insert(4);
list.insert(15);

list.print();
