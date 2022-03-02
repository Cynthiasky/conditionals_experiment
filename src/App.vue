<template>
  <Experiment title="magpie demo">
    <InstructionScreen :title="'Welcome'">
      Thank you for participatiing this experiment! 
      <br />
      <br />
      The experiment will take around 10 minutes. You will see pictures or video clips of three billiard balls. 
      Then you will be asked to answer some questions about the situation. 
      <br />
      <br />
      Press the button below to continue...
    </InstructionScreen>

    <InstructionScreen :title="'Instructions'">
      In this experiment, you will see pictures or video clips of <span style='color:#3EA333;font-weight:bold'>Ball A</span>, 
      <span style='color:#2662E0;font-weight:bold'>Ball B</span> and <b>Ball E</b>. Also, there are one or two red motion blocks.
      <br />
      <br />
      The light red block has a 20% chance to blocking a ball, while the dark red block has an 80% chance. 
      <br />
      <br />
      Press the button below to practice with some examples...
    </InstructionScreen>

    <!-- the practice phase -->
    <template v-for="(trial, i) in practiceData">
      <MyMultipleChoiceScreen
        :feedbackTime="-1"
        :key="i"
        question="According to the clip above, choose the correct answer:"
        :options="[trial.option1,trial.option2]"
      >
        <template #stimulus>
          <iframe
            id="physics-world-iframe"
            src="physics_world.html"
            width="400"
            height="300"
          ></iframe>
          <div id="simulation_text" style="text-align: center;" v-if="trial.exp=='video'">
            <p>Please press 'Watch' to view the whole clip.</p>
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
            v-if="trial.exp=='video'"
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
              )"
          >
            Watch
          </button>
          <Record :data="trial" />  
        </template>

        <template #feedback>
          <p v-if="$magpie.measurements.response === trial.answer">Correct</p>
          <p v-else>Try again!</p>
          <button @click="$magpie.nextScreen()">Ok</button>
        </template>

      </MyMultipleChoiceScreen>
    </template>

    <InstructionScreen :title="'Instructions'">
      Congratuations! You can continue with the rest of the experiment now.
      <br />
      <br />
      Please note: 
      <br />
      The position of the blocks and balls can vary accross clips or pictures. 
      <br />
      Also, the questions will be different with the examples before.
      <br />
      <br />
      Press the button below to continue...
    </InstructionScreen>
    <!-- the test phase -->
    <!--template v-for="(trial, i) in trialData">
      <MyMultipleChoiceScreen
        :key="i"
        question="Choose one sentence that accurately describe the situation:"
        :options="[trial.option1,trial.option2]"
      >
        <template #stimulus>
          <iframe
            id="physics-world-iframe"
            src="physics_world.html"
            width="400"
            height="300"
          ></iframe>
          <div id="simulation_text" style="text-align: center;" v-if="trial.exp=='because'">
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
            v-if="trial.exp=='because'"
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
              )"
          >
            Watch
          </button>
            <Record :data="trial" />  
        </template>
      </MyMultipleChoiceScreen-->
      <!--Screen>
        <p>Do you prefer other discriptions?</p>
        <TextareaInput :response.sync="$magpie.measurements.response" />
        <button @click="$magpie.saveAndNextScreen();">Next</button> 
      </Screen>
    </template-->
    <PostTestScreen />

    <!-- While developing your experiment, using the DebugResults screen is fine,
      once you're going live, you can use the <SubmitResults> screen to automatically send your experimental data to the server. -->
    <DebugResultsScreen />
  </Experiment>
</template>

<script>
// Load data from csv files as javascript arrays with objects
import trialData from '../trials/training_trials.csv';
import practiceData from '../trials/practice_trials.csv'
//import trialData from '../trials/trials.csv';
import _ from 'lodash'
import MyMultipleChoiceScreen from './MyMultipleChoiceScreen';


var template_if = "If Ball A passes the block, Ball E will pass the gate.";
var template_because = "Ball E passed the gate because Ball A passed the block.";


var genTrials = function(data) {
      // groupby condition
      // _.chain(data)
      //.filter("exp" == "main")
      //.groupby(data, )
      //.map((value, key) => ({ condition: key, trial: value }))
      //.value()
      // map sample 2 into the group
      // shuffle the final data
      /*
      var makeMainTrials = function() {
  return(_.shuffle(_.map(conditions, function(c) {
  var matchingTrials = _.filter(imaze_trials, function(t) {
    return(t.condition == c.condition && t.suite == c.suite)
  })
  console.log(result);
  return(_.shuffle(matchingTrials)[0])
  
})))}
*/
      return data;
}

//var trialData = genTrials();


export default {
  name: 'App',
  components: {
    MyMultipleChoiceScreen
  },
  data() {
    return {
      //trialData
      //trialData: genTrials(trialData),
      //trialData: _.shuffle(trialData),
     practiceData
    };
  },
  methods: {
    
    /*
    genQuestions: function (structure, pos, exp="if", question = "A") {
      var template = (exp == "if" ? template_if : template_because);
      // search for A/B and switch 
      if(question == "B") {
        //search for A in the string and set it to B
      }
      //if structure contains "common" and pos contains Aleft
      // swap op1, op2; then change A/B

      
    },
    */
    startScene: function (structure, block1, block2, time, pos, pA, pB) {
      //console.log('huhu haha');
      var physics_world = document.getElementById(
        'physics-world-iframe'
      ).contentWindow;
      //document.getElementById('simulate').prop('disabled',true);
      physics_world.Start(structure, block1, block2, time, pos, pA, pB);
      //document.getElementById('simulate').prop('disabled',false);
    }
  },
  /*
  getQuestions: function (exp, structure, pos) {
    if(exp == 'main' && structure!='common_single') {
      return ['If Ball A get through the block, Ball E will pass the gate.', 'If Ball B get through the block, Ball E will pass the gate.'];
    }
    else if(exp == 'filler') {
      return ['Ball E passed the gate because Ball A passed the block.', 'Ball E passed the gate because Ball B passed the block.'];
    }
    else {
      var gateball = (pos.includes('Aleft')) ? 'A' : 'B';
      var blockball = (pos.includes('Aleft')) ? 'B' : 'A';
      return ['If Ball $(gateball) pass the gate, Ball E will pass the gate.', 'If Ball $(blockball) get through the block, Ball E will pass the gate.'];      
    }
  }
  */
};
</script>