<template>
  <Screen>
    <template v-for="(trial, idx) in trainingProb">
    <Slide>
      <template>
      <iframe
        id="physics-world-iframe"
        src="physics_world.html"
        width="400"
        height="300"
      ></iframe>
      <div id="simulation_text" style="text-align: center;">
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
      <div v-if="videoWatched && !showFeedback">
      <p>According to the videos above, guess the following probabilities.</p>
      <p>The chance of the <span style='color:rgba(255, 0, 0, 0.35);font-weight:bold'>light red block</span> blocking a ball is around: {{$magpie.measurements.light!==undefined?$magpie.measurements.light:50}}% </p>
      <p>The chance of the <span style='color:rgba(255, 0, 0, 0.8);font-weight:bold'>dark red block</span> blocking a ball is around: {{$magpie.measurements.light!==undefined?(100-$magpie.measurements.light):50}}% </p>
      <SliderInput
        left='0%'        
        right='100%'
        :initial=initBar
        :interval='10'
        :response.sync="$magpie.measurements.light"
      />
      </div>

      <div v-if="
          (videoWatched) &&
          $magpie.measurements.light!==undefined
        ">
        <div v-if="(trial.condition=='video')&&showFeedback">
            <Wait :time="100" @done="genFeedback()" />
            <p>{{feedback}}</p>
            <button class='green-btn' @click="resetFeedback(trial.condition,false);resetClicked(trial.condition,false);">Ok</button>
        </div>
        <button v-if="!showFeedback" @click="resetFeedback(trial.condition,true);resetClicked(trial.condition,false);"
        >
        Next
        </button>
      </div>
      </template>
      </Slide>
    </template>
  </Screen>
</template>

<script>
import trainingProb from '../trials/training_prob_trials.csv';


export default {
  name: 'ProbTraining',
  
  data() {
    return {
      trainingProb: _.shuffle(trainingProb),
      //trainingProb,
      initBar: 50,
      feedback: "",
      videoWatched: false,
      showFeedback: false,
      final: false
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
          this.initBar = $magpie.measurements.light;
          //console.log($magpie.measurements.light);
          $magpie.saveMeasurements();
          this.final?$magpie.nextScreen():$magpie.nextSlide();
        }
      }
    },
    resetFeedback: function (cond, show=false) {
      if(cond=='video' || cond=='picture') {
        this.showFeedback = show;
      }
    },
    genFeedback: function () {
      if ($magpie.measurements.light == 20) {
        this.feedback = "Correct! The light red block has a 20% chance of blocking a ball; the dark red block has a 80% chance.";
        this.final = true;
      }
      else {
        this.feedback = "You chose " + $magpie.measurements.light + "% for the light red block, which is " +
        (($magpie.measurements.light>20) ? "higher" : "lower") + " than the real value. Try again!";
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
