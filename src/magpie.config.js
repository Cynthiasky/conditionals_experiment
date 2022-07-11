export default {
  experimentId: '88',
  //serverUrl: 'https://mcmpact.ikw.uni-osnabrueck.de/magpie/api/submit_experiment/',//'https://magpie-demo.herokuapp.com/',
  serverUrl: 'https://mcmpact.ikw.uni-osnabrueck.de/magpie/',
  //socketUrl: 'wss://mcmpact.ikw.uni-osnabrueck.de/socket',
  // this will be used in prolific mode
  completionUrl: 'https://app.prolific.co/submissions/complete?cc=3AA4F97D', //'https://...',
  contactEmail: 't.li.17@student.rug.nl',
  // Either 'debug', 'directLink' or 'prolific'
  //mode: 'debug'
  //mode: 'directLink'
  mode: 'prolific'
};
