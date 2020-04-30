<template>
  <div class="graph-show h-100">
    <b-container fluid class="h-100">
      <b-row v-if="graph" class="h-100">
        <b-col cols="9">
          <GraphEditor
            :graph="graph"
            @nodes-updated="updateGraphNodes"
            @edges-updated="updateGraphEdges"
            mode="edit"
          />
        </b-col>
        <b-col>
          <b-container fluid>
            <b-row>
              <GraphForm :incoming-data="graph" @save-graph="saveGraph" />
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import GraphService from "@/utils/graph.service";
import GraphForm from "@/components/GraphForm";
import GraphEditor from "@/components/GraphEditor";

export default {
  name: "GraphEdit",
  components: { GraphForm, GraphEditor },
  data() {
    return {
      graph: null
    };
  },
  methods: {
    updateGraphNodes(nodes) {
      this.graph.network.nodes = nodes;
    },
    updateGraphEdges(edges) {
      this.graph.network.edges = edges;
    },
    saveGraph(graphData) {
      new GraphService().updateGraph(this.graph.id, {
        ...this.graph,
        ...graphData
      });

      this.$router.push({ name: "GraphView", params: { id: this.graph.id } });
    }
  },
  mounted() {
    this.graph = new GraphService().getGraphById(this.$route.params.id);
  }
};
</script>
