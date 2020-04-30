<template>
  <div class="editor-wrapper">
    <div ref="network" class="h-100"></div>
  </div>
</template>

<script>
import { Graph } from "@/utils/vis-network";

const network = new Graph(); // https://github.com/almende/vis/issues/2567

export default {
  name: "GraphEditor",
  props: {
    graph: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      default: "view"
    }
  },
  data() {
    return {};
  },
  methods: {
    addNode(nodeData, callback) {
      // Show modal

      // Fill Node label & title
      const title = prompt("Please entre node title");
      if (!title) {
        return;
      }
      nodeData.title = title;
      nodeData.label = title;

      // Add the node
      callback(nodeData);

      // Emit new DataSet
      this.updateNodesSet();
    },
    editNode(nodeData, callback) {
      callback(nodeData);
      // this.toggleNodeSelection(false);
      this.updateNodesSet();
    },
    deleteNode(deletedItems, callback) {
      callback(deletedItems);

      if (deletedItems.nodes.length > 0) {
        // Emit new nodes DataSet
        this.updateNodesSet();
      }

      if (deletedItems.edges.length > 0) {
        // Emit new edges DataSet
        this.updateEdgesSet();
      }
    },
    updateNodesSet() {
      this.$emit("nodes-updated", network.getNodesDataSet().get());
    },

    addEdge(edgeData, callback) {
      // Add the node
      callback(edgeData);

      // Emit new DataSet
      this.updateEdgesSet();
    },
    editEdge(edgeData, callback) {
      callback(edgeData);

      // Emit new DataSet
      this.updateEdgesSet();
    },
    deleteEdge(deletedItems, callback) {
      callback(deletedItems);

      if (deletedItems.edges.length > 0) {
        // Emit new edges DataSet
        this.updateEdgesSet();
      }
    },
    updateEdgesSet() {
      this.$emit("edges-updated", network.getEdgesDataSet().get());
    },

    getManipulationOption() {
      return {
        manipulation:
          this.mode === "edit"
            ? {
                enabled: true,
                initiallyActive: true,
                addNode: this.addNode,
                addEdge: this.addEdge,
                editNode: this.editNode,
                editEdge: this.editEdge,
                deleteNode: this.deleteNode,
                deleteEdge: this.deleteEdge,
                controlNodeStyle: {}
              }
            : false
      };
    }
  },
  mounted() {
    const {
      network: { nodes, edges, options }
    } = this.graph;

    network.init(
      this.$refs.network,
      { nodes, edges },
      Object.assign({}, options, this.getManipulationOption())
    );
  }
};
</script>

<style lang="scss">
.editor-wrapper {
  position: relative;
  height: 100%;
}
</style>
