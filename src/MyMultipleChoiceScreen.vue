
<template>
  <Screen :progress="progress" :idx="idx">
    <Slide>
    <template>
      <iframe
        id="physics-world-iframe"
        src="physics_world.html"
        width="400"
        height="300"
      ></iframe>
      <div id="simulation_text" style="text-align: center;" v-if="trial.condition=='because'||trial.condition=='video'">
        <p>Please press 'START' to watch the video.</p>
        <p style='color:rgb(169,169,169)'>(You can always watch again by pressing 'START' again.)</p>
      </div>
      <Wait :time="600" @done="startScene(
            (structure = trial.structure),
            (block1 = trial.block1),
            (block2 = trial.block2),
            (time = 2),
            (pos = trial.pos),
            (pA = trial.pA),
            (pB = trial.pB)
        )" />
        
      <Record :data="{...trial, key:idx}" />

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
        Start
      </button>
    <!--quickly skip screen quickly debug-->
    <KeypressInput
            :keys="{
              '~': 'skip'
            }"
            :showOptions=false
            @update:response="$magpie.nextScreen();" />
    </template>
    

    <template>
      <!--Record
        :data="{
          question:
        }"
      /-->
      <div v-if="trial.condition=='if' || trial.condition=='picture' || videoWatched">
      <p v-if="question && !showFeedback" v-text="question"></p>
      <MultipleChoiceInput
        v-if="!showFeedback"
        :options="options"
        :options-html="options"
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
        <p>(Optional) Do you prefer other descriptions?</p>
        <TextareaInput :response.sync="$magpie.measurements.alt_description" />
        </div>

    <div v-if="(trial.condition=='video' || trial.condition=='picture')&&showFeedback">
        <p v-if="$magpie.measurements.response == trial.expect_ans">Correct!</p>
        <p v-else v-html="trial.feedback"></p>
        <button class='green-btn' @click="resetFeedback(trial.condition,false);resetClicked(trial.condition,false);">Ok</button>
    </div>

        <button v-if="!showFeedback" @click="resetFeedback(trial.condition,true);resetClicked(trial.condition,false);"
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

    idx: {
      type: Number,
      default: undefined
    }
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
          if((cond == 'if' || cond == 'because') && $magpie.measurements.alt_description===undefined) {
            //console.log($magpie.measurements.alt_description);
            $magpie.measurements.alt_description = "NA";
          }
          $magpie.saveMeasurements();
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
<style scoped>
.green-btn {
  background-color: green;
}
</style>
