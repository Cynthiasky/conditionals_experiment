
var flag;
var STATE;

$(document).ready(function() { 
  flag = 0;
  STATE = new Next();
});

var Next = function() {
  html = '<iframe src="physics_world.html" width=800 height=600 id="game-frame"></iframe>';
  $('.physics_world_practice').html(html);

  var physics_world = document.getElementById('game-frame').contentWindow;
  

  $('#simulate').prop('disabled',false);
  //var that = this;

  $('#simulate').click(function () {
    $('#simulate').prop('disabled',true)
    //if (flag != 0) {
    //  that.responses();
    //}
    physics_world.Start(structure = 'disjunctive', block1 = true, block2 = false,time = 300,pos = 'Atop', pA = 0.2, pB = 0.8);
    //this.responses()
    //flag++;
  });
};