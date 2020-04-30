<template>
  <div class="graph-view h-100">
    <b-row v-if="graph" class="h-100">
      <b-col cols="9">
        <GraphEditor v-if="graphIsEmpty" :graph="graph" />
        <div v-else>
          <h3 class="text-muted text-center">Please Click "Edit" on the right side to add new nodes.</h3>
        </div>
      </b-col>
      <b-col>
        <b-container fluid>
          <b-row>
            <b-card :title="graph.name" class="w-100">
              <b-card-text>
                <p class="text-muted">{{ graph.description }}</p>
              </b-card-text>

              <b-button-toolbar>
                <b-button-group class="mr-3">
                  <b-button @click="editGraph()" variant="info">Edit</b-button>
                  <b-button @click="deleteGraph()" variant="danger">Delete</b-button>
                </b-button-group>

                <b-button-group>
                  <b-button @click="viewGraphStatistics()">View Statistics</b-button>
                </b-button-group>
              </b-button-toolbar>
              <template v-slot:footer>
                <small>Last update {{ graph.updatedAt }}</small>
              </template>
            </b-card>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import GraphService from "@/utils/graph.service";
import GraphEditor from "@/components/GraphEditor";

export default {
  name: "GraphView",
  components: { GraphEditor },
  data() {
    return {
      graph: null
    };
  },
  computed: {
    graphIsEmpty() {
      return this.graph.network.nodes.length > 0;
    }
  },
  methods: {
    editGraph() {
      this.$router.push({ name: "GraphEdit", params: { id: this.graph.id } });
    },
    deleteGraph() {
      if (
        confirm("Are you sure you want to delete this graph" + this.graph.name)
      ) {
        new GraphService().deleteGraph(this.graph.id);
        this.$router.push({ name: "Home" });
      }
    },
    viewGraphStatistics() {
      this.$router.push({
        name: "GraphStatistics",
        params: { id: this.graph.id }
      });
    }
  },
  mounted() {
    const graphId = this.$route.params.id;
    this.graph = new GraphService().getGraphById(graphId);
  }
};
</script>
