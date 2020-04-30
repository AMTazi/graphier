<template>
  <b-form @submit.prevent class="w-100">
    <b-form-group
      label="Enter graph name"
      label-for="name"
      :invalid-feedback="nameInvalidFeedback"
      :state="nameState"
    >
      <b-form-input
        id="name"
        v-model="graphForm.name"
        :state="nameState"
        trim
        placeholder="Graph name"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label="Enter graph description"
      label-for="description"
      :state="descriptionState"
    >
      <b-form-textarea
        id="description"
        placeholder="Graph description"
        v-model="graphForm.description"
        :state="descriptionState"
        trim
      ></b-form-textarea>
    </b-form-group>
    <p class="text-right">
      <b-button
        type="submit"
        variant="primary"
        :disabled="submitButtonDisabled"
        @click="onSubmit"
        >Save</b-button
      >
    </p>
  </b-form>
</template>

<script>
export default {
  props: {
    incomingData: {
      type: Object
    }
  },
  data() {
    return {
      showForm: false,
      graphForm: {
        name:
          this.incomingData && this.incomingData.name
            ? this.incomingData.name
            : "",
        description:
          this.incomingData && this.incomingData.description
            ? this.incomingData.description
            : ""
      }
    };
  },
  computed: {
    nameState() {
      return this.graphForm.name.length >= 4 ? true : false;
    },
    descriptionState() {
      return this.graphForm.description.length >= 4 ? true : false;
    },
    nameInvalidFeedback() {
      if (this.graphForm.name.length > 4) {
        return "";
      } else if (this.graphForm.name.length > 0) {
        return "Enter at least 4 characters";
      } else {
        return "Please enter something";
      }
    },
    submitButtonDisabled() {
      return !(this.nameState && this.descriptionState);
    }
  },
  methods: {
    onSubmit() {
      if (this.nameState && this.descriptionState) {
        this.$emit("save-graph", this.graphForm);
      }
      if (!this.incomingData) {
        this.graphForm = { name: "", description: "" };
      }
    }
  }
};
</script>
