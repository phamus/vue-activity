<template>
  <div v-if="isLoaded" id="activityApp">
    <!-- navbar -->
    <TheNavbar :fullname="appFullName" />
    <!-- navbar end -->
    <section class="container">
      <div class="columns">
        <!-- ActivityCreate -->

        <ActivityCreate :categories="categories" @activityCreate="addActivity" />
        <!-- ActivityCreate -->

        <div class="column is-9">
          <div class="box content" :class="{fetching:isFetching, 'has-error': error}">
            <div v-if="error">{{ error }}</div>
            <div v-else>
              <div v-if="isFetching">Loading...</div>
              <div v-else>
                <ActivityItem
                  v-for="activity in activities"
                  :key="activity.id"
                  :activity="activity"
                  :categories="categories"
                  @activityDeleted="handleActivityDelete"
                />
              </div>
            </div>
            <div v-if="!isFetching">
              <div v-if="!error">
                <div class="activity-length">Currently {{ activityLength }} activities</div>
                <div class="activity-motivation">{{ activityMotivation }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import ActivityItem from "./components/ActivityItem";
import ActivityCreate from "./components/ActivityCreate";
import TheNavbar from "./components/TheNavbar";
import {
  fetchActivities,
  fetchCategories,
  fetchUser,
  deleteActivityAPI
} from "./api";
export default {
  name: "App",
  components: { ActivityItem, ActivityCreate, TheNavbar },
  data() {
    return {
      message: "Hello Vue!",
      titleMessage: "Title Message Vue!!!!!",
      creator: "phamus",
      appName: "Activity planner",
      watchedAppName: "Activity Planner",

      isFetching: false,
      error: null,
      user: {},

      activities: null,
      categories: null
    };
  },

  computed: {
    appFullName() {
      return this.appName + " by " + this.creator;
    },

    activityLength() {
      return Object.keys(this.activities).length;
    },

    activityMotivation() {
      if (this.activityLength && this.activityLength < 5) {
        return "Nice to see some activities";
      } else if (this.activityLength >= 5) {
        return "So many activities! good job";
      } else {
        return "No Activites";
      }
    },
    isLoaded() {
      return this.activities && this.categories;
    }
  },

  created() {
    this.isFetching = true;
    fetchActivities()
      .then(activities => {
        this.activities = activities;
        this.isFetching = false;
      })
      .catch(err => {
        this.error = err;
        this.isFetching = false;
      });
    this.user = fetchUser();
    fetchCategories().then(categories => {
      this.categories = categories;
    });
  },

  methods: {
    addActivity(newActivity) {
      Vue.set(this.activities, newActivity.id, newActivity);
    },
    handleActivityDelete(activity) {
      deleteActivityAPI(activity).then(deletedActivity => {
        Vue.delete(this.activities, deletedActivity.id);
      });
    }
  }
};
</script>

<style>
#activityApp {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,
body {
  font-family: "Open Sans", serif;
  background: #f2f6fa;
}
footer {
  background-color: #f2f6fa !important;
}
.activity-motivation {
  float: right;
}
.activity-length {
  display: inline-block;
}
.topNav {
  border-top: 5px solid #3498db;
}
.topNav .container {
  border-bottom: 1px solid #e6eaee;
}
.container .columns {
  margin: 3rem 0;
}
.navbar-menu .navbar-item {
  padding: 0 2rem;
}

.fetching {
  border: 1px solid orange;
}
.has-error {
  border: 1px solid red;
}
aside.menu {
  padding-top: 3rem;
}
aside.menu .menu-list {
  line-height: 1.5;
}
aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700;
}
.button.is-primary.is-alt {
  background: #00c6ff;
  background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
  background: linear-gradient(to bottom, #0072ff, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}
.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8f99a3;
}
article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e6eaee;
}
article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.menu-list li {
  padding: 5px;
}

.navbar-brand > h1 {
  font-size: 31px;
  padding: 20px;
}

.example-wrapper {
  margin-left: 30px;
}
</style>
