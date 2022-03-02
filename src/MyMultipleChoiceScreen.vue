
<template>
  <!-- pass down props -->
  <LifecycleScreen v-bind="$props">
    <!-- pass down slots -->
    <template slot="fixation">
      <slot name="fixation"></slot>
    </template>
    <template slot="stimulus">
      <slot name="stimulus"></slot>
    </template>

    <template #task>
      <Record
        :data="{
          question,
          options
        }"
      />
      <p v-if="question" v-text="question"></p>
      <MultipleChoiceInput
        :options="options"
        :orientation="orientation"
        :response.sync="$magpie.measurements.response"
        @update:response="nextAfterResponse"
      />
      <button
        v-if="
          $magpie.measurements.response &&
          (!$magpie.validateMeasurements.response ||
          !$magpie.validateMeasurements.response.$invalid)
        "
        @click="$magpie.saveAndNextScreen()"
      >
        Next
      </button>
    </template>
    <template #feedback>
      <slot name="feedback"></slot>
    </template>
  </LifecycleScreen>
</template>

<script>

/**
 * Have participants choose answer from multiple options
 * Adapt from the magpie MultipleChoiceScreen
 */
export default {
  name: 'MyMultipleChoiceScreen',
  props: {
    /**
     * A question
     */
    question: {
      type: String,
      required: true
    },
    /**
     * The possible options to choose from
     */
    options: {
      type: Array,
      required: true
    },
    /**
     * Whether to display 'vertical' or 'horizontal'
     */
    orientation: {
      type: String,
      default: 'vertical'
    }
  }
};
</script>
<style scoped></style>
