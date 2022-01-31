<template>
  <div id="app">
    <h2>Bar Chart Example</h2>
    <button @click="playVideo" id="simulate">Play</button>
    <my-canvas style="width: 100%; height: 600px;">
      <my-box
        v-for="(obj, index) of chartValues"
        :key=index
        :x1="(index / chartValues.length) * 100"
        :x2="(index / chartValues.length) * 100 + 100 / chartValues.length"
        :y1="100"
        :y2="100 - obj.val"
        :color="obj.color"
        :value="obj.val"
      >
      </my-box>
    </my-canvas>
  </div>
</template>

<!--script src="../public/lib/Box2dWeb-2.1.a.3.js" type="text/javascript"></script-->

<script>
import MyCanvas from './components/MyCanvas.vue';
import MyBox from './components/MyBox.vue';
//import * as Box2D from '../public/lib/Box2dWeb-2.1.a.3.js'
import Box2D from '../public/lib/Box2dWeb-2.1.a.3'

//import {setUp} from '../public/lib/test.js'

export default {
  name: 'app',
  components: {
    MyCanvas,
    MyBox,
    
  },

  data() {
    return {
      chartValues: [
        { val: 24, color: 'red' },
        { val: 32, color: '#0f0' },
        { val: 66, color: 'rebeccapurple' },
        { val: 1, color: 'green' },
        { val: 28, color: 'blue' },
        { val: 60, color: 'rgba(150, 100, 0, 0.2)' },
      ],
    };
  },

  mounted() {
    //let script = document.createElement('script');
    //script.type = 'text/javascript';
    //script.src = './Box2dWeb-2.1.a.3.js';
    //document.body.appendChild(script);


    let dir = 1;
    let selectedVal = Math.floor(Math.random() * this.chartValues.length);

    setInterval(() => {
      if (Math.random() > 0.995) dir *= -1;
      if (Math.random() > 0.99)
        selectedVal = Math.floor(Math.random() * this.chartValues.length);

      this.chartValues[selectedVal].val = Math.min(
        Math.max(this.chartValues[selectedVal].val + dir * 0.5, 0),
        100
      );
    }, 16);
  },
  methods: {
    playVideo() {
        //setUp();
        // TODO
        var b2Vec2 = Box2D.Common.Math.b2Vec2; 
        //var b2BodyDef = Box2D.Dynamics.b2BodyDef;
    }
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  position: relative;
  height: 100vh;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
}
</style>