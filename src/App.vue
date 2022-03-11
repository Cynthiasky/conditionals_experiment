<template>
  <Experiment title="conditionals">
    <InstructionScreen :title="'Welcome'">
      Thank you for participating this experiment! 
      <br />
      <br />
      The experiment will take less than 10 minutes. You will see pictures or video clips of three billiard balls. 
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
      There will be an arrow below the initially moving ball(s). The light red block has a 20% chance to blocking a ball, while the dark red block has an 80% chance. 
      <br />
      <br />        
      For example, you may see a situation like this: 
      <br />
      <br />  
      <div style="text-align: center;">
      <img src="static/images/instruction.png" />
      </div>
      <br />
      In this example, both <span style='color:#3EA333;font-weight:bold'>Ball A</span> and <span style='color:#2662E0;font-weight:bold'>Ball B</span> are initially moving. 
      The darker red block is on the way of <span style='color:#3EA333;font-weight:bold'>Ball A</span>, 
      so <span style='color:#3EA333;font-weight:bold'>Ball A</span> is more likely to be blocked than <span style='color:#2662E0;font-weight:bold'>Ball B</span>.
      <br />
      <br />
      Press the button below to continue...
    </InstructionScreen>

    <InstructionScreen :title="'Practice'">
      Let's see some examples to get familar with the information before!
      <br />
      <br />
      In this section, you will see some pictures or video clips. You have to choose the correct answer from two options for each situation. There is only one correct answer. 
      <br />
      Then, you will have a feedback about your choice (correct or the reason of wrong). 
      <br />
      <br />
      Press the button to start...
    </InstructionScreen>

    <!-- the practice phase -->
    <template v-for="(trial, i) in practiceData">
      <MyMultipleChoiceScreen
        :trial=trial
        question="According to the situation above, choose one of the correct answer:"
        :options="[trial.option1,trial.option2]"
      >
      </MyMultipleChoiceScreen>
    </template>

    <InstructionScreen :title="'Experiment'">
      Congratuations! Now you can continue with the main part of the experiment.
      <br />
      <br />
      In this section, you will see some pictures or video clips. You have to choose one of the two options that you think is the better discription of the situation. There is no correct or wrong answer, and you will not receive feedback after your choice. 
      <br />
      You will see an optional text box after your choice, and you can freely write a better description that is not given in the options.
      <br />
      <br />
      Please note: 
      <br />
      The positions of the blocks and balls can vary accross clips or pictures. 
      <br />
      Also, the questions will be different with the examples before. The questions may change for different situations. So please read each question carefully and think over your preference. 
      <br />
      <br />
      Good luck!
      <br />
      <br />
      Press the button below to start...
    </InstructionScreen>
    <!-- the test phase -->
    <template v-for="(trial, i) in trialData">
      <MyMultipleChoiceScreen
        :key="i"
        :trial=trial
        question="Choose one sentence that accurately describe the situation:"
        :options="[trial.option1,trial.option2]"
        :progress="i/trialData.length"
      />
    </template>
    <PostTestScreen />
    <!-- While developing your experiment, using the DebugResults screen is fine,
      once you're going live, you can use the <SubmitResults> screen to automatically send your experimental data to the server. -->
    <SubmitResultsScreen />
    <!--DebugResultsScreen /-->
  </Experiment>
</template>

<script>
// Load data from csv files as javascript arrays with objects
import trialsAll from '../trials/training_trials.csv';
import practiceData from '../trials/practice_trials.csv'
import _ from 'lodash'
import MyMultipleChoiceScreen from './MyMultipleChoiceScreen';


var opt = {'if':_.template('If Ball A passes the <%= block_gate %>, Ball E will pass the gate.'),
'because':_.template('Ball E passed the gate because Ball A passed the <%= block_gate %>.')};


var genTrials = function(data, condition, size) {
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
      t.option1 = opt[condition]({'block_gate': _.startsWith(t.pos,'Aright')?'block':'gate'});
      t.option2 = _.replace(opt[condition]({'block_gate': _.startsWith(t.pos,'Aright')?'gate':'block'}),'A','B');
    }
    else {
      t.option1 = opt[condition]({'block_gate': 'block'});
      t.option2 = _.replace(opt[condition]({'block_gate': 'block'}),'A','B');
    }
    t.condition = condition;
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
  all = _.shuffle(all);

  var idx = [4, 9, 14, 19];
  for(var i=0; i<idx.length; i++) {
    var t = idx[i];
    all = _.concat(_.slice(all,0,t), control[i], _.slice(all,t,all.length));
  }
  //console.log(_.filter(all,['condition','if']));
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
      trialData: trialData,
      trialsAll: trialsAll,
      //trialData: _.shuffle(trialData),
      practiceData: practiceData
    };
  },
  methods: {
    genTrials: genTrials,
    myConcat: myConcat
  }
};
</script>