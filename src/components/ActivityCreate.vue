<template>
  <div class="column is-3">
    <a
      v-if="!isFormDisplay"
      class="button is-primary is-block is-alt is-large"
      href="#"
      @click.prevent="toggleFormDisplay"
    >New Activity</a>

    <div v-if="isFormDisplay" class="create-form">
      <h2>Create Activity</h2>
      <form>
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input v-model="newActivity.title" class="input" type="text" placeholder="Read a Book" />
          </div>
        </div>
        <div class="field">
          <label class="label">Notes</label>
          <div class="control">
            <textarea v-model="newActivity.notes" class="textarea" placeholder="Write some notes" />
          </div>
        </div>
        <div class="field">
          <label class="label">Category</label>
          <div class="control">
            <select v-model="newActivity.cateogry" class="select">
              <option default disabled value>Please Select One</option>
              <option v-for="cateogry in categories" :key="cateogry.id">{{ cateogry.text }}</option>
            </select>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button
              class="button is-link"
              :disabled="!isFormValid"
              @click.prevent="createActivity"
            >Create Activity</button>
          </div>
          <div class="control">
            <button class="button is-link" @click="toggleFormDisplay">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { createActivityAPI } from "../api";
export default {
  props: {
    categories: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFormDisplay: false,
      newActivity: {
        title: "",
        notes: "",
        cateogry: ""
      }
    };
  },

  computed: {
    isFormValid() {
      return (
        this.newActivity.title &&
        this.newActivity.notes &&
        this.newActivity.cateogry
      );
    }
  },
  methods: {
    toggleFormDisplay() {
      this.isFormDisplay = !this.isFormDisplay;
    },
    createActivity() {
      createActivityAPI({ ...this.newActivity }).then(activity => {
        this.resetForm();
        this.$emit("activityCreate", { ...activity });
      });
    },
    resetForm() {
      this.newActivity.title = "";
      this.newActivity.notes = "";
      this.newActivity.cateogry = "";
      this.isFormDisplay = false;
    }
  }
};
</script>

<style scoped>
</style>
