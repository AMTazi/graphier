<template>
  <div class="home">
    <b-container>
      <b-list-group>
        <b-list-group-item class="flex-column">
          <h1 class="m-0 text-right">
            <b-button @click="showForm = !showForm" variant="primary">
              Add Graph
              <b-icon icon="plus" variant="light" size="2"></b-icon>
            </b-button>
          </h1>
          <GraphForm v-if="showForm" @save-graph="addGraph" />
        </b-list-group-item>
        <b-list-group-item
          v-for="{ id, name, description, updatedAt } in graphs"
          :key="id"
          :to="{ name: 'GraphView', params: { id } }"
          class="flex-column align-items-start"
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ name }}</h5>
            <small>last updated {{ updatedAt }}</small>
          </div>

          <p class="mb-1">{{ description }}</p>
        </b-list-group-item>
      </b-list-group>
    </b-container>
  </div>
</template>

<script>
import GraphService from "@/utils/graph.service";
const GraphForm = () => import("@/components/GraphForm.vue");

export default {
  name: "Home",
  components: {
    GraphForm
  },
  data() {
    return {
      showForm: false,
      graphService: new GraphService()
    };
  },
  computed: {
    graphs() {
      return this.graphService.getGraphs();
    }
  },
  methods: {
    addGraph(graphData) {
      const id = this.graphService.addGraph(graphData);
      this.$router.push({ name: "GraphEdit", params: { id } });
    }
  }
};
</script>
