<template>
  <v-card class="mb-5" :to="to" :disabled="disabled">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle :class="completed?'':'teal--text'">{{ subtitle }}</v-card-subtitle>
    <v-icon large color="teal" class="action">mdi-arrow-right</v-icon>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: true
    },
    to: {
      type: Object,
      required: true,
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false
    }
  },
};
</script>

<style scoped>
.action {
  position: absolute;
  top: 50%;
  right: .2em;
  transform: translateY(-50%);
}
</style>
