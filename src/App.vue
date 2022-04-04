<template>
  <Experiment title="conditionals">
    <InstructionScreen :title="'Welcome'">
      Thank you for participating in this experiment! 
      <br />
      <br />
      The experiment will take less than 10 minutes (including a practice session and the main experiment). You will see pictures or video clips of three billiard balls. 
      Then you will be asked to answer some questions about the situation. 
      <br />
      <br />
      Press the button below to continue...
    </InstructionScreen>

    <InstructionScreen :title="'Instructions'">
      In this experiment, you will see pictures or video clips of <span style='color:#3EA333;font-weight:bold'>Ball A</span>, 
      <span style='color:#2662E0;font-weight:bold'>Ball B</span> and <b>Ball E</b>. There will be an arrow below the initially moving ball(s). 
      <br />
      <br />
      Also, there are one or two red motion blocks. The <span style='color:rgba(255, 0, 0, 0.35);font-weight:bold'>light red block</span> has a 20% chance of blocking a ball, while the <span style='color:rgba(255, 0, 0, 0.8);font-weight:bold'>dark red block</span> has an 80% chance. 
      <br />
      <br />
      The balls and blocks are surrounded by walls. There is a <span style='font-weight:bold'>gate</span> on the left side that allows balls to pass through.
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
      The <span style='color:rgba(255, 0, 0, 0.8);font-weight:bold'>darker red block</span> is in the way of <span style='color:#3EA333;font-weight:bold'>Ball A</span>, 
      so <span style='color:#3EA333;font-weight:bold'>Ball A</span> is more likely to be blocked than <span style='color:#2662E0;font-weight:bold'>Ball B</span>.
      <br />
      <br />
      Press the button below to continue...
    </InstructionScreen>

    <InstructionScreen :title="'Practice'">
      Let's see some examples to get familiar with the information before starting the main experiment!
      <br />
      <br />
      In this practice section, you will see some pictures or video clips. You have to choose the correct answer from two options for each situation. <strong>There is only one correct answer.</strong> The purpose of this practice part is to get you familiar with the displays and the behavior of the balls.
      <br />
      <br />
      After each selection, you will receive feedback about your choice (if it was correct or why it was wrong). 
      <br />
      <br />
      Press the button to start...
    </InstructionScreen>
    
    <!-- the practice phase -->
    <template v-for="(trial, i) in practiceData">
      <MyMultipleChoiceScreen
        :trial=trial
        :idx="i"
        question="According to the situation above, which description is correct:"
        :options="[trial.option1,trial.option2]"
      >
      </MyMultipleChoiceScreen>
    </template>

    <InstructionScreen :title="'Main experiment'">
      Congratuations! Now you can continue with the main part of the experiment.
      <br />
      <br />
      In this section, you will see pictures or video clips just like during the practice session. 
      You will see two sentences for each picture or video.
      <strong>Your task is to choose the sentence that better describes the situation.</strong> 
      There might not be a correct answer.
      Sometimes both sentences might be acceptable, sometimes neither.
      Just choose the sentence that you think is intuitively a better description.
      <br />
      You will not receive feedback after your choice in this section. 
      <br />
      <br />
      Afer each choice, you will see a text box. If you like, you can freely write a better description that is not given in the options. 
      <strong>Writing anything in the textbox is entirely optional.</strong>
      <br />
      <br />
      Press the button below to continue...
    </InstructionScreen>
    <InstructionScreen :title="'Main experiment'">
      Please keep in mind: 
      <br />
      <br />
      1. Choose the sentence that better describes the situation. 
      <br />
      <br />
      2. The questions will be different from the examples before and may change for different situations. So please read each question carefully and think about your preferences. 
      <br />
      <br />
      3. The <span style='color:rgba(255, 0, 0, 0.35);font-weight:bold'>light red block</span> has a 20% chance of blocking a ball, while the <span style='color:rgba(255, 0, 0, 0.8);font-weight:bold'>dark red block</span> has an 80% chance. 
      <br />
      <br />
      When you are ready, press the button below to start...
    </InstructionScreen>
    <!-- the test phase -->
    <template v-for="(trial, i) in trialData">
      <MyMultipleChoiceScreen
        :idx="i"
        :trial=trial
        question="Choose the sentence that better describes the situation:"
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


var opt = {'if':_.template("If Ball A passes the <%= block_gate %>, Ball E will pass the gate."),
'because':_.template("Ball E passed the gate because Ball A passed the <%= block_gate %>.")};


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
    t.expect_ans = ((t.expect_event=='A')?t.option1:t.option2);
    //console.log(t.expect_event);
    t.condition = condition;
    return t;
  });
  //return _.shuffle(gen_opt);
  return gen_opt;
};

var myConcat = function(d) {
  var copyd = _.cloneDeep(d);
  var a = genTrials(d,'if',2);
  var b = genTrials(copyd,'because',2);

  //var all =  _.shuffle(_.concat(a,b));
  var all =  _.concat(a,b);
  var control = _.shuffle(_.remove(all,['structure','single']));
  //all = _.shuffle(all);

  var new_all = [];
  //all = [];
  var struct_all = ['common_single','common_both','chain','disjunctive','conjunctive'];
  for(var i = 0; i < 4; i++) {
  // shuffle cond_li every 4 ?
    struct_all = _.shuffle(struct_all);
    for(var j = 0; j < 5; j++) {
      var t = _.cloneDeep(_.sample(_.filter(all,['structure',struct_all[j]])));
      new_all.push(t);
      _.pullAllWith(all,[t],_.isEqual);
    }
  }
  
 

  var idx = [4, 9, 14, 19];
  for(var i = 0; i < idx.length; i++) {
    var t = idx[i];
    new_all = _.concat(_.slice(new_all,0,t), control[i], _.slice(new_all,t,new_all.length));
  }
  //console.log(_.filter(all,['condition','if']));
  //console.log(_.filter(new_all,['expect_event','A']).length);
  //console.log(_.filter(new_all,['expect_event','B']).length);
  return new_all;
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