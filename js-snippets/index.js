Object.prototype.dump = function() {
	console.log(JSON.stringify(this, null, 2));
};

function Graph(unidirectional) {
	function Queue() {
		var _queue = [];
		this.add = value =>
			Array.isArray(value) ? _queue.unshift(...value) : _queue.unshift(value);
		this.remove = () => _queue.pop();
		this.isEmpty = () => _queue.length === 0;
		this.length = () => _queue.length;
		this.print = () => _queue.forEach(v => console.log("value:", v));
	}

	function Node(id) {
		const _neighbours = [];
		this.id = id;
		this.addNeighbour = node => _neighbours.push(node);
		this.getNeighbours = () => _neighbours;
	}

	const _nodes = [];
	const _edges = [];

	const addNode = id => _nodes.push(new Node(id));

	const searchNodes = id => _nodes.find(node => node.id === id);

	const addEdge = (leftNodeId, rightNodeId) => {
		const left = searchNodes(leftNodeId);
		const right = searchNodes(rightNodeId);

		left.addNeighbour(right);
		if (!unidirectional) right.addNeighbour(left);
		_edges.push(`${leftNodeId}-> ${rightNodeId}`);
	};

	const NodeVisitor = __nodes => {
		let _visitors = [];

		const createViewModelForVisitor = () => {
			_visitors = __nodes.reduce((acc, curr) => {
				acc[curr.id] = false;
				return acc;
			}, {});
		};

		createViewModelForVisitor();

		const setNodeVisited = id => (_visitors[id] = true);

		const isNodeVisited = id => _visitors[id] === true;

		return { setNodeVisited, isNodeVisited };
	};

	this.addNode = addNode;
	this.searchNodes = searchNodes;
	this.addEdge = addEdge;
	this.dump = () => _nodes.dump();
	this.dumpEdges = () => _edges.dump();

	this.breadthFirstSearch = (id, cb) => {
		const queue = new Queue();
		const nodeVisitor = NodeVisitor(_nodes);

		const firstNode = _nodes[0];
		queue.add(firstNode);

		while (!queue.isEmpty()) {
			let node = queue.remove();
			let nodeId = node.id;
			if (!nodeVisitor.isNodeVisited(nodeId)) {
				nodeVisitor.setNodeVisited(nodeId);
				cb(node);
			}

			node.getNeighbours().forEach(n => {
				if (!nodeVisitor.isNodeVisited(n.id)) queue.add(n);
			});
		}
	};

	return this;
}

const graph = Graph(true);

graph.addNode("a");
graph.addNode("b");
graph.addNode("c");
graph.addNode("d");
graph.addNode("e");
graph.addNode("f");
graph.addEdge("a", "c");
graph.addEdge("a", "c");
graph.addEdge("a", "e");
graph.addEdge("b", "a");
graph.addEdge("b", "c");
graph.addEdge("c", "d");
graph.addEdge("c", "e");
graph.addEdge("d", "e");
graph.addEdge("e", "f");
graph.addEdge("f", "e");

graph.breadthFirstSearch("c", n => console.log(JSON.stringify(n, null, 2)));

graph.dumpEdges();
/******* Breadth First Search *******/
