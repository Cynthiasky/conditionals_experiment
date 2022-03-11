
<template>
  <Screen :progress="progress">
    <Slide>
    <template>
      <Record :data="trial" />
      <iframe
        id="physics-world-iframe"
        src="physics_world.html"
        width="400"
        height="300"
      ></iframe>
      <div id="simulation_text" style="text-align: center;" v-if="trial.condition=='because'||trial.condition=='video'">
        <p>Please press 'Watch' to view the rest of the clip.</p>
      </div>
      <Wait :time="800" @done="startScene(
            (structure = trial.structure),
            (block1 = trial.block1),
            (block2 = trial.block2),
            (time = 18),
            (pos = trial.pos),
            (pA = trial.pA),
            (pB = trial.pB)
        )" />
      <button
        v-if="trial.condition=='because'||trial.condition=='video'"
        id="simulate"
        type="button"
        class="next"
        @click="
          startScene(
            (structure = trial.structure),
            (block1 = trial.block1),
            (block2 = trial.block2),
            (time = trial.time),
            (pos = trial.pos),
            (pA = trial.pA),
            (pB = trial.pB)
          );resetClicked(trial.condition,true);"
      >
        Watch
      </button>
    </template>

    <template>
      <Record
        :data="{
          question
        }"
      />
      <div v-if="trial.condition=='if' || trial.condition=='picture' || videoWatched">
      <p v-if="question && !showFeedback" v-text="question"></p>
      <MultipleChoiceInput
        v-if="!showFeedback"
        :options="options"
        :response.sync="$magpie.measurements.response"
        
      />
      </div>
      <div v-if="
          (trial.condition=='if' || trial.condition=='picture' || videoWatched) &&
          $magpie.measurements.response &&
          (!$magpie.validateMeasurements.response ||
          !$magpie.validateMeasurements.response.$invalid)
        ">
        <div v-if="trial.condition != 'picture' && trial.condition != 'video'">
        <p>(Optional) Do you prefer other discriptions?</p>
        <TextareaInput :response.sync="$magpie.measurements.comments" />
        </div>

    <div v-if="(trial.condition=='video' || trial.condition=='picture')&&showFeedback">
        <p v-if="$magpie.measurements.response == trial.answer">Correct!</p>
        <p v-else >{{ trial.feedback }}</p>
        <button @click="resetFeedback(trial.condition,false);resetClicked(trial.condition,false);">Ok</button>
    </div>
        <button v-if="!showFeedback" @click="$magpie.saveMeasurements();resetFeedback(trial.condition,true);resetClicked(trial.condition,false);"
        >
        Next
        </button>
      </div>
    </template>
    </Slide>
  </Screen>
</template>

<script>

/**
 * Have participants choose answer from multiple options
 * Adapt from the magpie MultipleChoiceScreen
 */
export default {
  name: 'MyMultipleChoiceScreen',
  props: {
    
    question: {
      type: String,
      required: true
    },
    
    options: {
      type: Array,
      required: true
    },

    trial: {
      type: Object,
      required: true
    },

    progress: {
      type: Number,
      default: undefined
    },
  },
  data() {
    return {
      videoWatched: false,
      showFeedback: false
    };
  },
  methods: {
    startScene: function (structure, block1, block2, time, pos, pA, pB) {
      var physics_world = document.getElementById(
        'physics-world-iframe'
      ).contentWindow;
      physics_world.Start(structure, block1, block2, time, pos, pA, pB);
    },
    resetClicked: function (cond, clicked=false) {
      if(cond == 'video' && this.showFeedback) {
        this.videoWatched = true;
      }
      else {
        this.videoWatched = clicked;
        if(!this.showFeedback && !clicked) {
          $magpie.nextScreen();
        }
      }
    },
    resetFeedback: function (cond, show=false) {
      if(cond=='video' || cond=='picture') {
        this.showFeedback = show;
      }
    }
  }
};
</script>
<style scoped></style>
