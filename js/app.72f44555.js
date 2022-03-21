(function(t){function e(e){for(var i,a,l=e[0],c=e[1],s=e[2],p=0,m=[];p<l.length;p++)a=l[p],Object.prototype.hasOwnProperty.call(n,a)&&n[a]&&m.push(n[a][0]),n[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);u&&u(e);while(m.length)m.shift()();return r.push.apply(r,s||[]),o()}function o(){for(var t,e=0;e<r.length;e++){for(var o=r[e],i=!0,a=1;a<o.length;a++){var c=o[a];0!==n[c]&&(i=!1)}i&&(r.splice(e--,1),t=l(l.s=o[0]))}return t}var i={},n={app:0},r=[];function a(t){return l.p+"js/"+({}[t]||t)+"."+{"chunk-1335a3e6":"9ae796e1"}[t]+".js"}function l(e){if(i[e])return i[e].exports;var o=i[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,l),o.l=!0,o.exports}l.e=function(t){var e=[],o=n[t];if(0!==o)if(o)e.push(o[2]);else{var i=new Promise((function(e,i){o=n[t]=[e,i]}));e.push(o[2]=i);var r,c=document.createElement("script");c.charset="utf-8",c.timeout=120,l.nc&&c.setAttribute("nonce",l.nc),c.src=a(t);var s=new Error;r=function(e){c.onerror=c.onload=null,clearTimeout(p);var o=n[t];if(0!==o){if(o){var i=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;s.message="Loading chunk "+t+" failed.\n("+i+": "+r+")",s.name="ChunkLoadError",s.type=i,s.request=r,o[1](s)}n[t]=void 0}};var p=setTimeout((function(){r({type:"timeout",target:c})}),12e4);c.onerror=c.onload=r,document.head.appendChild(c)}return Promise.all(e)},l.m=t,l.c=i,l.d=function(t,e,o){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(l.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)l.d(o,i,function(e){return t[e]}.bind(null,i));return o},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/conditionals_experiment/",l.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=e,c=c.slice();for(var p=0;p<c.length;p++)e(c[p]);var u=s;r.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},1:function(t,e){},2:function(t,e){},"56d7":function(t,e,o){"use strict";o.r(e);var i=o("2b0e"),n=o("7591"),r=o.n(n),a=o("3665"),l=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("Experiment",{attrs:{title:"conditionals"}},[o("InstructionScreen",{attrs:{title:"Welcome"}},[t._v(" Thank you for participating this experiment! "),o("br"),o("br"),t._v(" The experiment will take less than 10 minutes. You will see pictures or video clips of three billiard balls. Then you will be asked to answer some questions about the situation. "),o("br"),o("br"),t._v(" Press the button below to continue... ")]),o("InstructionScreen",{attrs:{title:"Instructions"}},[t._v(" In this experiment, you will see pictures or video clips of "),o("span",{staticStyle:{color:"#3EA333","font-weight":"bold"}},[t._v("Ball A")]),t._v(", "),o("span",{staticStyle:{color:"#2662E0","font-weight":"bold"}},[t._v("Ball B")]),t._v(" and "),o("b",[t._v("Ball E")]),t._v(". Also, there are one or two red motion blocks. The balls and blocks are surrounded by walls. There is a gate on the left side that allows balls to pass through. "),o("br"),o("br"),t._v(" There will be an arrow below the initially moving ball(s). The light red block has a 20% chance to blocking a ball, while the dark red block has an 80% chance. "),o("br"),o("br"),t._v(" For example, you may see a situation like this: "),o("br"),o("br"),o("div",{staticStyle:{"text-align":"center"}},[o("img",{attrs:{src:"static/images/instruction.png"}})]),o("br"),t._v(" In this example, both "),o("span",{staticStyle:{color:"#3EA333","font-weight":"bold"}},[t._v("Ball A")]),t._v(" and "),o("span",{staticStyle:{color:"#2662E0","font-weight":"bold"}},[t._v("Ball B")]),t._v(" are initially moving. The darker red block is on the way of "),o("span",{staticStyle:{color:"#3EA333","font-weight":"bold"}},[t._v("Ball A")]),t._v(", so "),o("span",{staticStyle:{color:"#3EA333","font-weight":"bold"}},[t._v("Ball A")]),t._v(" is more likely to be blocked than "),o("span",{staticStyle:{color:"#2662E0","font-weight":"bold"}},[t._v("Ball B")]),t._v(". "),o("br"),o("br"),t._v(" Press the button below to continue... ")]),o("InstructionScreen",{attrs:{title:"Practice"}},[t._v(" Let's see some examples to get familar with the information before starting the main experiment! "),o("br"),o("br"),t._v(" In this section, you will see some pictures or video clips. You have to choose the correct answer from two options for each situation. There is only one correct answer. The purpose of this practice part is to get you familiar with the displays and the behavior of the balls. "),o("br"),t._v(" After each selection, you will receive feedback about your choice (if it was correct or why it was wrong). "),o("br"),o("br"),t._v(" Press the button to start... ")]),t._l(t.practiceData,(function(t,e){return[o("MyMultipleChoiceScreen",{attrs:{trial:t,idx:e,question:"According to the situation above, which description is correct:",options:[t.option1,t.option2]}})]})),o("InstructionScreen",{attrs:{title:"Experiment"}},[t._v(" Congratuations! Now you can continue with the main part of the experiment. "),o("br"),o("br"),t._v(" In this section, you will see pictures or video clips just like during the practice trial. You will see two sentences for each picture or video. "),o("strong",[t._v("Your task is to choose the sentence which better describes the situation.")]),t._v(" There might not be a correct answer. Sometimes both sentences might be acceptable, sometimes neither. Just choose the sentence which you think is intuitively a better description. You will not receive feedback after your choice. "),o("br"),t._v(" Afer each choice, you will see a text box. If you like, you can freely write a better description that is not given in the options. "),o("strong",[t._v("Writing anything in the textbox is entirely optional.")]),o("br"),o("br"),t._v(" Please note: "),o("br"),t._v(" The positions of the blocks and balls can vary accross clips or pictures. "),o("br"),t._v(" Also, the questions will be different from the examples before. The questions may change for different situations. So please read each question carefully and think over your preference. "),o("br"),o("br"),t._v(" Good luck! "),o("br"),o("br"),t._v(" Press the button below to start... ")]),t._l(t.trialData,(function(e,i){return[o("MyMultipleChoiceScreen",{attrs:{idx:i,trial:e,question:"Choose the sentence that better describes the situation:",options:[e.option1,e.option2],progress:i/t.trialData.length}})]})),o("PostTestScreen"),o("SubmitResultsScreen")],2)},c=[],s=o("7538"),p=o.n(s),u=o("6386"),m=o.n(u),b=o("2ef0"),h=o.n(b),d=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("Screen",{attrs:{progress:t.progress,idx:t.idx}},[o("Slide",[[o("iframe",{attrs:{id:"physics-world-iframe",src:"physics_world.html",width:"400",height:"300"}}),"because"==t.trial.condition||"video"==t.trial.condition?o("div",{staticStyle:{"text-align":"center"},attrs:{id:"simulation_text"}},[o("p",[t._v("Please press 'Watch' to view the video.")])]):t._e(),o("Wait",{attrs:{time:800},on:{done:function(e){t.startScene(t.structure=t.trial.structure,t.block1=t.trial.block1,t.block2=t.trial.block2,t.time=18,t.pos=t.trial.pos,t.pA=t.trial.pA,t.pB=t.trial.pB)}}}),o("Record",{attrs:{data:Object.assign({},t.trial,{key:t.idx})}}),"because"==t.trial.condition||"video"==t.trial.condition?o("button",{staticClass:"next",attrs:{id:"simulate",type:"button"},on:{click:function(e){t.startScene(t.structure=t.trial.structure,t.block1=t.trial.block1,t.block2=t.trial.block2,t.time=t.trial.time,t.pos=t.trial.pos,t.pA=t.trial.pA,t.pB=t.trial.pB),t.resetClicked(t.trial.condition,!0)}}},[t._v(" Watch ")]):t._e(),o("KeypressInput",{attrs:{keys:{"~":"skip"},showOptions:!1},on:{"update:response":function(e){return t.$magpie.nextScreen()}}})],["if"==t.trial.condition||"picture"==t.trial.condition||t.videoWatched?o("div",[t.question&&!t.showFeedback?o("p",{domProps:{textContent:t._s(t.question)}}):t._e(),t.showFeedback?t._e():o("MultipleChoiceInput",{attrs:{options:t.options,response:t.$magpie.measurements.response},on:{"update:response":function(e){return t.$set(t.$magpie.measurements,"response",e)}}})],1):t._e(),"if"!=t.trial.condition&&"picture"!=t.trial.condition&&!t.videoWatched||!t.$magpie.measurements.response||t.$magpie.validateMeasurements.response&&t.$magpie.validateMeasurements.response.$invalid?t._e():o("div",["picture"!=t.trial.condition&&"video"!=t.trial.condition?o("div",[o("p",[t._v("(Optional) Do you prefer other discriptions?")]),o("TextareaInput",{attrs:{response:t.$magpie.measurements.alt_description},on:{"update:response":function(e){return t.$set(t.$magpie.measurements,"alt_description",e)}}})],1):t._e(),"video"!=t.trial.condition&&"picture"!=t.trial.condition||!t.showFeedback?t._e():o("div",[t.$magpie.measurements.response==t.trial.expect_ans?o("p",[t._v("Correct!")]):o("p",[t._v(t._s(t.trial.feedback))]),o("button",{on:{click:function(e){t.resetFeedback(t.trial.condition,!1),t.resetClicked(t.trial.condition,!1)}}},[t._v("Ok")])]),t.showFeedback?t._e():o("button",{on:{click:function(e){t.$magpie.saveMeasurements(),t.resetFeedback(t.trial.condition,!0),t.resetClicked(t.trial.condition,!1)}}},[t._v(" Next ")])])]],2)],1)},f=[],k={name:"MyMultipleChoiceScreen",props:{question:{type:String,required:!0},options:{type:Array,required:!0},trial:{type:Object,required:!0},progress:{type:Number,default:void 0},idx:{type:Number,default:void 0}},data(){return{videoWatched:!1,showFeedback:!1}},methods:{startScene:function(t,e,o,i,n,r,a){var l=document.getElementById("physics-world-iframe").contentWindow;l.Start(t,e,o,i,n,r,a)},resetClicked:function(t,e=!1){"video"==t&&this.showFeedback?this.videoWatched=!0:(this.videoWatched=e,this.showFeedback||e||$magpie.nextScreen())},resetFeedback:function(t,e=!1){"video"!=t&&"picture"!=t||(this.showFeedback=e)}}},v=k,g=o("2877"),B=Object(g["a"])(v,d,f,!1,null,"74f65faf",null),A=B.exports,_={if:h.a.template("If Ball A passes the <%= block_gate %>, Ball E will pass the gate."),because:h.a.template("Ball E passed the gate because Ball A passed the <%= block_gate %>.")},y=function(t,e,o){var i=h.a.chain(t).groupBy("structure").map((function(t,e){return h.a.sampleSize(t,o)})).flatten().value(),n=h.a.map(i,(function(t){return h.a.startsWith(t.structure,"common")?(t.option1=_[e]({block_gate:h.a.startsWith(t.pos,"Aright")?"block":"gate"}),t.option2=h.a.replace(_[e]({block_gate:h.a.startsWith(t.pos,"Aright")?"gate":"block"}),"A","B")):(t.option1=_[e]({block_gate:"block"}),t.option2=h.a.replace(_[e]({block_gate:"block"}),"A","B")),t.expect_ans="A"==t.expect_event?t.option1:t.option2,t.condition=e,t}));return n},x=function(t){for(var e=h.a.cloneDeep(t),o=y(t,"if",2),i=y(e,"because",2),n=h.a.concat(o,i),r=h.a.shuffle(h.a.remove(n,["structure","single"])),a=[],l=["common_single","common_both","chain","disjunctive","conjunctive"],c=0;c<4;c++){l=h.a.shuffle(l);for(var s=0;s<5;s++){var p=h.a.cloneDeep(h.a.sample(h.a.filter(n,["structure",l[s]])));a.push(p),h.a.pullAllWith(n,[p],h.a.isEqual)}}var u=[4,9,14,19];for(c=0;c<u.length;c++){p=u[c];a=h.a.concat(h.a.slice(a,0,p),r[c],h.a.slice(a,p,a.length))}return a},w=x(p.a),E={name:"App",components:{MyMultipleChoiceScreen:A},data(){return{trialData:w,trialsAll:p.a,practiceData:m.a}},methods:{genTrials:y,myConcat:x}},S=E,j=Object(g["a"])(S,l,c,!1,null,null,null),I=j.exports,T={experimentId:"83",serverUrl:"https://mcmpact.ikw.uni-osnabrueck.de/magpie/",completionUrl:"",contactEmail:"t.li.17@student.rug.nl",mode:"directLink"};i["default"].config.productionTip=!1,i["default"].use(r.a,{prefix:"Canvas"}),i["default"].use(a["a"],T),new i["default"]({render:t=>t(I)}).$mount("#app")},6386:function(t,e){t.exports=[{experiment:"practice",condition:"picture",structure:"chain",block1:!1,block2:!1,time:300,pos:"Aright",pA:.8,pB:.2,option1:"Ball A is the initially moving ball.",option2:"Ball B is the initially moving ball.",expect_ans:"Ball A is the initially moving ball.",feedback:"Wrong. There is an arrow under Ball A, so it is the initially moving ball."},{experiment:"practice",condition:"video",structure:"common_single",block1:!1,block2:!1,time:300,pos:"Aleft_Etop",pA:.2,pB:.2,option1:"Ball A hit Ball E.",option2:"Ball B hit Ball E.",expect_ans:"Ball B hit Ball E.",feedback:"Wrong. Ball A is not the initially moving ball."},{experiment:"practice",condition:"picture",structure:"single",block1:!1,block2:!1,time:300,pos:"Abottom_Etop",pA:.8,pB:.8,option1:"Ball A can hit Ball E.",option2:"Ball B can hit Ball E.",expect_ans:"Ball B can hit Ball E.",feedback:"Wrong. Ball A is not a moving ball, and Ball E is on the way of Ball B."},{experiment:"practice",condition:"picture",structure:"conjunctive",block1:!1,block2:!1,time:300,pos:"Abottom",pA:.2,pB:.8,option1:"Ball A is more likely to pass the block than Ball B.",option2:"Ball B is more likely to pass the block than Ball A.",expect_ans:"Ball B is more likely to pass the block than Ball A.",feedback:"Wrong. The darker red block (more likely to block) is on the way of Ball A."},{experiment:"practice",condition:"video",structure:"conjunctive",block1:!0,block2:!1,time:300,pos:"Atop",pA:.2,pB:.8,option1:"If Ball A had passed its block, Ball E would have gone through the gate.",option2:"If Ball A would have passed its block, Ball E would not have gone through the gate.",expect_ans:"If Ball A had passed its block, Ball E would have gone through the gate.",feedback:"Wrong. In this situation, if both A and B hit Ball E it passes the gate."},{experiment:"practice",condition:"video",structure:"common_both",block1:!1,block2:!0,time:300,pos:"Aright_Ebot",pA:.8,pB:.2,option1:"Ball A hit Ball B.",option2:"Ball B passed the gate.",expect_ans:"Ball A hit Ball B.",feedback:"Wrong. Ball A hit Ball B, but Ball B was blocked."},{experiment:"practice",condition:"picture",structure:"disjunctive",block1:!1,block2:!1,time:300,pos:"Atop",pA:.2,pB:.8,option1:"Ball A is more likely to pass the block than Ball B.",option2:"Ball B is more likely to pass the block than Ball A.",expect_ans:"Ball B is more likely to pass the block than Ball A.",feedback:"Wrong. The darker red block (more likely to block) is on the way of Ball A."},{experiment:"practice",condition:"video",structure:"disjunctive",block1:!1,block2:!1,time:300,pos:"Abottom",pA:.2,pB:.8,option1:"If Ball A had not passed its block, Ball E would not have gone through the gate.",option2:"If Ball A had not passed its block, Ball E would still have gone through the gate.",expect_ans:"If Ball A had not passed its block, Ball E would still have gone through the gate.",feedback:"Wrong. In this situation, only one ball is necessary to let Ball E pass the gate."}]},7538:function(t,e){t.exports=[{experiment:"main",condition:"if",structure:"common_single",block1:!1,block2:!1,time:300,pos:"Aleft_Ebottom",pA:.2,pB:.2,option1:"B"},{experiment:"main",condition:"if",structure:"common_single",block1:!1,block2:!1,time:300,pos:"Aleft_Etop",pA:.8,pB:.8,option1:"B"},{experiment:"main",condition:"if",structure:"common_single",block1:!1,block2:!1,time:300,pos:"Aright_Ebottom",pA:.8,pB:.8,option1:"A"},{experiment:"main",condition:"if",structure:"common_single",block1:!1,block2:!1,time:300,pos:"Aright_Etop",pA:.2,pB:.2,option1:"A"},{experiment:"main",condition:"if",structure:"common_single",block1:!1,block2:!1,time:300,pos:"Aleft_Ebottom",pA:.8,pB:.8,option1:"B"},{experiment:"main",condition:"if",structure:"common_single",block1:!1,block2:!1,time:300,pos:"Aleft_Etop",pA:.2,pB:.2,option1:"B"},{experiment:"main",condition:"if",structure:"common_single",block1:!1,block2:!1,time:300,pos:"Aright_Ebottom",pA:.2,pB:.2,option1:"A"},{experiment:"main",condition:"if",structure:"common_single",block1:!1,block2:!1,time:300,pos:"Aright_Etop",pA:.8,pB:.8,option1:"A"},{experiment:"main",condition:"if",structure:"common_both",block1:!1,block2:!1,time:300,pos:"Aright_Ebottom",pA:.8,pB:.2,option1:"A"},{experiment:"main",condition:"if",structure:"common_both",block1:!1,block2:!1,time:300,pos:"Aright_Etop",pA:.8,pB:.2,option1:"A"},{experiment:"main",condition:"if",structure:"common_both",block1:!1,block2:!1,time:300,pos:"Aleft_Ebottom",pA:.8,pB:.2,option1:"B"},{experiment:"main",condition:"if",structure:"common_both",block1:!1,block2:!1,time:300,pos:"Aleft_Etop",pA:.8,pB:.2,option1:"B"},{experiment:"main",condition:"if",structure:"common_both",block1:!1,block2:!1,time:300,pos:"Aright_Ebottom",pA:.2,pB:.8,option1:"A"},{experiment:"main",condition:"if",structure:"common_both",block1:!1,block2:!1,time:300,pos:"Aright_Etop",pA:.2,pB:.8,option1:"A"},{experiment:"main",condition:"if",structure:"common_both",block1:!1,block2:!1,time:300,pos:"Aleft_Ebottom",pA:.2,pB:.8,option1:"B"},{experiment:"main",condition:"if",structure:"common_both",block1:!1,block2:!1,time:300,pos:"Aleft_Etop",pA:.2,pB:.8,option1:"B"},{experiment:"main",condition:"if",structure:"chain",block1:!1,block2:!1,time:300,pos:"Aright",pA:.8,pB:.2,option1:"B"},{experiment:"main",condition:"if",structure:"chain",block1:!1,block2:!1,time:300,pos:"Aright",pA:.2,pB:.8,option1:"B"},{experiment:"main",condition:"if",structure:"chain",block1:!1,block2:!1,time:300,pos:"Aleft",pA:.8,pB:.2,option1:"A"},{experiment:"main",condition:"if",structure:"chain",block1:!1,block2:!1,time:300,pos:"Aleft",pA:.2,pB:.8,option1:"A"},{experiment:"main",condition:"if",structure:"disjunctive",block1:!1,block2:!1,time:300,pos:"Atop",pA:.2,pB:.8,option1:"B"},{experiment:"main",condition:"if",structure:"disjunctive",block1:!1,block2:!1,time:300,pos:"Atop",pA:.8,pB:.2,option1:"A"},{experiment:"main",condition:"if",structure:"disjunctive",block1:!1,block2:!1,time:300,pos:"Abottom",pA:.2,pB:.8,option1:"B"},{experiment:"main",condition:"if",structure:"disjunctive",block1:!1,block2:!1,time:300,pos:"Abottom",pA:.8,pB:.2,option1:"A"},{experiment:"main",condition:"if",structure:"conjunctive",block1:!1,block2:!1,time:300,pos:"Atop",pA:.2,pB:.8,option1:"A"},{experiment:"main",condition:"if",structure:"conjunctive",block1:!1,block2:!1,time:300,pos:"Atop",pA:.8,pB:.2,option1:"B"},{experiment:"main",condition:"if",structure:"conjunctive",block1:!1,block2:!1,time:300,pos:"Abottom",pA:.2,pB:.8,option1:"A"},{experiment:"main",condition:"if",structure:"conjunctive",block1:!1,block2:!1,time:300,pos:"Abottom",pA:.8,pB:.2,option1:"B"},{experiment:"main",condition:"if",structure:"single",block1:!1,block2:!1,time:300,pos:"Atop_Etop",pA:.8,pB:.8,option1:"A"},{experiment:"main",condition:"if",structure:"single",block1:!1,block2:!1,time:300,pos:"Atop_Ebottom",pA:.8,pB:.8,option1:"B"},{experiment:"main",condition:"if",structure:"single",block1:!1,block2:!1,time:300,pos:"Abottom_Ebottom",pA:.8,pB:.8,option1:"A"},{experiment:"main",condition:"if",structure:"single",block1:!1,block2:!1,time:300,pos:"Abottom_Etop",pA:.8,pB:.8,option1:"B"}]}});
//# sourceMappingURL=app.72f44555.js.map