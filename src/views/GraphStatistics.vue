<template>
  <div class="graph-view h-100">
    <b-row v-if="graph" class="h-100">
      <b-col>
        <b-container fluid>
          <b-row>
            <b-col cols="4" class="mr-3">
              <b-card title="Graph Details" class="w-100">
                <div>
                  <b-table bordered :items="generalInfo"></b-table>
                </div>
              </b-card>
            </b-col>
            <b-col>
              <b-card title="Nodes Table" class="w-100">
                <div v-if="!graphIsEmpty">
                  <b-table bordered :items="nodesTable"></b-table>
                </div>
                <div v-else>
                  <span class="text-muted">This graph is empty</span>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
      <b-col cols="12">
        <GraphEditor v-if="!graphIsEmpty" :graph="graph" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import GraphService from "@/utils/graph.service";
import GraphEditor from "@/components/GraphEditor";

export default {
  name: "GraphStatistics",
  components: { GraphEditor },
  data() {
    return {
      graph: null
    };
  },
  computed: {
    graphIsEmpty() {
      return !(this.graph.network.nodes.length > 0);
    },
    generalInfo() {
      const { name, description, createdAt, updatedAt, network } = this.graph;
      return [
        {
          property: "Name",
          value: name
        },
        {
          property: "Description",
          value: description
        },
        {
          property: "Nodes",
          value: network.nodes.length
        },
        {
          property: "Relations",
          value: network.edges.length
        },
        {
          property: "Created At",
          value: createdAt
        },
        {
          property: "Updated At",
          value: updatedAt
        }
      ];
    },

    nodesTable() {
      const {
        network: { nodes, edges }
      } = this.graph;

      const parsedNodes = nodes.reduce((accumulator, currentNode) => {
        return Object.assign(accumulator, {
          [currentNode.id]: currentNode.title
        });
      }, {});

      return nodes.map(node => {
        return {
          node_ID: node.id,
          node_tooltip: node.title,
          node_neighbors: edges
            .filter(edge => edge.to === node.id || edge.from === node.id)
            .map(edge => {
              const nodeId = edge.to === node.id ? edge.from : edge.to;
              return `${nodeId} (${parsedNodes[nodeId]})`;
            })
            .join(", ")
        };
      });
    }
  },
  mounted() {
    this.graph = new GraphService().getGraphById(this.$route.params.id);
  }
};
</script>
