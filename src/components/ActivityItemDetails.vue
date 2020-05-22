<template>
  <article class="post">
    <div class="activity-title-wrapper">
      <h4 class="title">{{ activity.title }}</h4>
      <i class="fas fa-cog activity-settings" @click="toggleActivityControl"></i>
    </div>
    <p class="category">{{ textCapitalize(categories[activity.category].text) }}</p>
    <p>{{ activity.notes }}</p>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="../assets/user.png" />
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">Filip Jerga</a>
            updated
            {{ activity.updatedAt | prettyTime }} &nbsp;
          </p>
        </div>
      </div>
      <div class="media-right">
        <span>
          Progress
          <span :class="'color-'+progressColor">{{ activity.progress }} %</span>
        </span>
      </div>
    </div>
    <div v-if="isMenuDisplay" class="activity-control">
      <a class="button is-warning" @click="$emit('toggleUpdate', true)">Edit</a>
      <a class="button is-danger" @click="deleteActivity">Delete</a>
    </div>
    <hr />
  </article>
</template>

<script>
import textUtility from "../mixins/textUtility";
export default {
  mixins: [textUtility],
  props: {
    categories: {
      type: Object,
      required: true
    },
    activity: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isMenuDisplay: false
    };
  },
  computed: {
    progressColor() {
      const progress = this.activity.progress;
      if (progress <= 0) {
        return "red";
      } else if (progress <= 50) {
        return "orange";
      } else {
        return "green";
      }
    }
  },
  methods: {
    toggleActivityControl() {
      return (this.isMenuDisplay = !this.isMenuDisplay);
    },
    deleteActivity() {
      this.$emit("activityDeleted", this.activity);
    }
  }
};
</script>

<style lang="scss" scoped>
.color-red {
  color: red;
}
.color-green {
  color: green;
}

.color-orange {
  color: orange;
}

.title {
  margin-bottom: 2px;
}
.category {
  font-style: italic;
  font-size: 17px;
}

.activity-title {
  margin-bottom: 5px;
  display: inline-block;
}

.activity-settings {
  float: right;
  font-size: 22px;

  &:hover {
    cursor: pointer;
  }
}

.activity-control {
  margin: 20px 0 0 0;
  a {
    margin-right: 5px;
  }
}
</style>
