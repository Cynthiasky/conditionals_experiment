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
    <!--template v-for="(trial, i) in practiceData">
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
    </InstructionScreen-->
    <!-- the test phase -->
    <template v-for="(trial, i) in trialData">
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
      </MyMultipleChoiceScreen>
      <!--Screen>
        <p>Do you prefer other discriptions?</p>
        <TextareaInput :response.sync="$magpie.measurements.response" />
        <button @click="$magpie.saveAndNextScreen();">Next</button> 
      </Screen-->
    </template>
    <PostTestScreen />

    <!-- While developing your experiment, using the DebugResults screen is fine,
      once you're going live, you can use the <SubmitResults> screen to automatically send your experimental data to the server. -->
    <DebugResultsScreen />
  </Experiment>
</template>

<script>
// Load data from csv files as javascript arrays with objects
import trialsAll from '../trials/training_trials.csv';
import practiceData from '../trials/practice_trials.csv'
//import trialData from '../trials/trials.csv';
import _ from 'lodash'
import MyMultipleChoiceScreen from './MyMultipleChoiceScreen';


var opt = {'if':_.template('If Ball A passes the <%= block_gate %>, Ball E will pass the gate.'),
'because':_.template('Ball E passed the gate because Ball A passed the <%= block_gate %>.')};


var genTrials = function(data, exp, size) {
 // for each condition, sample exp trials with size 
  var sample = _.chain(data)
      .groupBy('structure')
      .map(function(trials,struct) {
        return _.sampleSize(trials,size);
      })
      .flatten()
      .value();
 // get forced choice questions 
 var gen_opt = _.map(sample, function(t) {
    if(_.startsWith(t.structure,'common')) {
      t.option1 = opt[exp]({'block_gate': _.startsWith(t.pos,'Aright')?'block':'gate'});
      t.option2 = _.replace(opt[exp]({'block_gate': _.startsWith(t.pos,'Aright')?'gate':'block'}),'A','B');
    }
    else {
      t.option1 = opt[exp]({'block_gate': 'block'});
      t.option2 = _.replace(opt[exp]({'block_gate': 'block'}),'A','B');
    }
    t.exp = exp;
    return t;
 });
 return _.shuffle(gen_opt);
};

var myConcat = function(d) {
  var copyd = _.cloneDeep(d);
  var a = genTrials(d,'if',2);
  var b = genTrials(copyd,'because',2);

  var all =  _.shuffle(_.concat(a,b));
  var control = _.shuffle(_.remove(all,['structure','single']));

  var idx = [4, 9, 14, 19];
  for(var i=0; i<idx.length; i++) {
    var t = idx[i];
    all = _.concat(_.slice(all,0,t), control[i], _.slice(all,t,all.length));
  }
  //console.log(_.filter(all,['exp','if']));
  // todo: avoid same cond together
  return all;
};
var trialData = myConcat(trialsAll);

export default {
  name: 'App',
  components: {
    MyMultipleChoiceScreen
  },
  data() {
    return {
      //trialData
      trialData: trialData,
      trialsAll: trialsAll,
      //trialData: genTrials(trialsAll,'if'),
      //trialData: _.shuffle(trialData),
    //practiceData
    };
  },
  methods: {
    genTrials: genTrials,
    myConcat: myConcat,
    startScene: function (structure, block1, block2, time, pos, pA, pB) {
      var physics_world = document.getElementById(
        'physics-world-iframe'
      ).contentWindow;
      physics_world.Start(structure, block1, block2, time, pos, pA, pB);
    }
  }
};
</script>