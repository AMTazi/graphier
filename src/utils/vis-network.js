import { DataSet } from "vis-data/peer/esm/vis-data";
import { Network } from "vis-network/peer/esm/vis-network";

export class Graph {
  constructor() {
    this.network = null;
    this.nodesDataSet = null;
    this.edgesDataSet = null;
  }

  getInstance() {
    return this.network;
  }

  init(container, { nodes, edges }, options) {
    this.nodesDataSet = new DataSet();
    this.nodesDataSet.add(nodes);

    this.edgesDataSet = new DataSet();
    this.edgesDataSet.add(edges);

    this.network = new Network(
      container,
      { nodes: this.nodesDataSet, edges: this.edgesDataSet },
      options
    );
  }

  getNodesDataSet() {
    return this.nodesDataSet;
  }

  getEdgesDataSet() {
    return this.edgesDataSet;
  }
}
