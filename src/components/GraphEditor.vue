<template>
  <div class="editor-wrapper">
    <div ref="network" class="h-100"></div>
    <GraphEditorToolbar v-if="mode === 'edit'" @add-node="addNode()" />
  </div>
</template>

<script>
// import { Network } from "vis-network/peer/esm/vis-network";
import { Graph } from "@/services/network";
import GraphEditorToolbar from "@/components/GraphEditorToolbar.vue";

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
  components: { GraphEditorToolbar },
  data() {
    return {};
  },
  methods: {
    addNode() {
      network.getInstance().addNodeMode();
    },
    updateNodesSet() {
      this.$emit("nodes-updated", network.getNodesDataSet().get());
    },
    addEdge() {
      network.getInstance().addEdgeMode();
    },
    updateEdgesSet() {
      this.$emit("edges-updated", network.getEdgesDataSet().get());
    },
    editNode() {
      network.getInstance().editNode();
    },
    editEdge() {
      network.getInstance().editEdgeMode();
    },
    deleteSelected() {
      network.getInstance().deleteSelected();
    },
    triggerToolbarItem(method) {
      this[method]();
    },
    toggleNodeSelection(selection) {
      this.toolbarItems.editNode.active = selection;
      this.toolbarItems.deleteSelected.active = selection;
    },
    toggleEdgeSelection(selection) {
      this.toolbarItems.editEdge.active = selection;
      this.toolbarItems.deleteSelected.active = selection;
    }
  },
  mounted() {
    network.init(
      this.$refs.network,
      { nodes: this.graph.network.nodes, edges: this.graph.network.edges },
      {
        ...this.graph.network.options,
        manipulation:
          this.mode === "edit"
            ? {
                enabled: true,
                initiallyActive: true,
                addNode: (nodeData, callback) => {
                  // Show modal

                  // Fill Node label & title
                  const title = prompt("Please entre node title");
                  nodeData.title = title;
                  nodeData.label = title;

                  // Add the node
                  callback(nodeData);

                  // Emit new DataSet
                  this.updateNodesSet();
                },
                addEdge: (edgeData, callback) => {
                  // Add the node
                  callback(edgeData);

                  // Emit new DataSet
                  this.updateEdgesSet();
                },
                editNode: (nodeData, callback) => {
                  callback(nodeData);
                  // this.toggleNodeSelection(false);
                  this.updateNodesSet();
                },
                editEdge: (edgeData, callback) => {
                  callback(edgeData);
                  // this.toggleEdgeSelection(false);
                  // Emit new DataSet
                  this.updateEdgesSet();
                },
                deleteNode: (deletedItems, callback) => {
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
                deleteEdge: (deletedItems, callback) => {
                  callback(deletedItems);

                  if (deletedItems.edges.length > 0) {
                    // Emit new edges DataSet
                    this.updateEdgesSet();
                  }
                },
                controlNodeStyle: {}
              }
            : false
      }
    );
    // const networkInstance = network.getInstance();

    // networkInstance.on("selectNode", () => {
    //   this.toggleNodeSelection(true);
    // });

    // networkInstance.on("deselectNode", () => {
    //   this.toggleNodeSelection(false);
    // });

    // networkInstance.on("selectEdge", () => {
    //   this.toggleEdgeSelection(true);
    // });

    // networkInstance.on("deselectEdge", () => {
    //   this.toggleEdgeSelection(false);
    // });
  }
};
</script>
<style lang="scss">
.editor-wrapper {
  position: relative;
  height: 100%;
}
</style>
