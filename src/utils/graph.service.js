import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "graphier";
const graphCommonOptions = {
  nodes: {
    shape: "dot",
    size: 30,
    font: {
      size: 14,
      color: "#000000"
    },
    borderWidth: 2
  },
  edges: {
    width: 2
  },
  physics: {
    enabled: false
  }
};

class GraphService {
  constructor() {
    this.storage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      graphs: []
    };
  }

  addGraph({ name, description }) {
    const id = uuidv4();

    const newGraph = {
      id,
      name,
      description,
      network: {
        nodes: [],
        edges: [],
        options: graphCommonOptions
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const existingGraphs = this.storage.graphs;
    this.storage.graphs = [newGraph, ...existingGraphs];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.storage));

    return id;
  }

  getGraphs() {
    return this.storage.graphs;
  }

  getGraphById(id) {
    return this.storage.graphs.filter(graph => graph.id === id)[0];
  }

  updateGraph(id, newGraph) {
    newGraph.updatedAt = new Date().toLocaleString();

    this.storage.graphs = this.storage.graphs.map(graph => {
      if (graph.id === id) {
        return newGraph;
      }
      return graph;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.storage));
  }

  deleteGraph(id) {
    this.storage.graphs = this.storage.graphs.filter(graph => graph.id !== id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.storage));
  }
}

export default GraphService;
