//var osc;

var scaleArray = [60, 62, 64, 65, 67, 69, 71, 72];

function setup() {
  createCanvas(710, 200);
  noStroke();
}

function draw() {
}

var envelopes = {};
function getUserEnvelope(uid){
    if (envelopes[uid]){
      return envelopes[uid];
    }else{
      //temp
      var envelope = new p5.Env(random(0,1), 0.5, Math.random(0,1), 0.5);
      //TODO: make configuration of a new envelope
      envelopes[uid] = envelope;
      return envelopes[uid];
    }
}

var players = {};
var MAX_OSC_SIZE = 3;
function getPlayer(uid){
  if (!players[uid]){
    //decide mode
     var mode = Math.floor(Math.random()*2+1);
    // mode is decided
    //var mode = 3;

    if (mode == 1){
      var filter = new p5.BandPass()
      //var reverb = new p5.Reverb()
      var noise = new p5.Noise()
      noise.disconnect()
      filter.process(noise)

      var res = {
        'filter':filter,
        'noise':noise,
        //'reverb':reverb
      }

      players[uid] = {
        //put mode into player
        'mode':mode,
        'resources':tmp,
      };
    }
    else if (mode == 2) {
      var filter = new p5.LowPass()
      var reverb = new p5.Reverb()
      var noise = new p5.Noise('white')
      noise.disconnect()
      filter.process(noise)

      var res = {
        'filter':filter,
        'noise':noise,
        'reverb':reverb
      }

      players[uid] = {
        'mode':mode,
        'resources':res
      }
    }
//mode 3
    // else if{
    //   var carrier = new p5.Oscillator()
    //   var modulator = new p5.TriOsc
    //   carrier.freq(340);
    //   carrier.amp(0);
    //   modulator.disconnect()
    //   //carrier.amp(modulator.scale(-1,1,1,-1));
    //   var res = {
    //     'carrier':carrier,
    //     'modulator':modulator,
    //   }
    //
    //   players[uid] = {
    //     //put mode into player
    //     'mode':mode,
    //     'resources':res,
    //   };
    // }
    //
  }

  return players[uid]
}

var oscs = [];
function playnotes(uid, mx, my){
  var player = getPlayer(uid);
  if (player.mode == 1){
    player.resources.noise.start();
    player.resources.noise.pan(2 * mx/width - 1, 0.1)
    player.resources.noise.amp(0.8, 1);
    }
  }
  else if (player.mode == 2) {
    player.resources.noise.start();
    player.resources.noise.pan(2 * mx/width - 1, 0.1)
    player.resources.noise.amp(0.8, 1);
  }
  //3
  // else if (player.mode == 3){
  //   //player.resources.carrier.freq(340);
  //   //player.resources.carrier.amp(0);
  //   player.resources.carrier.start();
  //   var modFreq = map(my,0, height,20,0);
  //   var modAmp = map(mx,0,width,0,1)
  //   player.resources.modulator.freq(modFreq)
  //   player.resources.modulator.amp(modAmp, 0.01)
  //   player.resources.modulator.start()
  // }
}

function stopnotes(uid, mx, my){
  var player = getPlayer(uid);
  if (player.mode == 1){
    player.resources.noise.amp(0,1);
  }else if (player.mode == 2) {
    player.resources.noise.amp(0,1);
    // player.resources.noise.stop();
  }
  // else if (player.mode == 3){
  //   player.resources.modulator.amp(0,0.5)
  //   player.resources.carrier.stop(0.5)
  //   player.resources.modulator.stop(0.5)
  // }
}

function updatenotes(uid, mx, my){
  var player = getPlayer(uid);
  if (player.mode == 1){
    var filterFreq = map (mouseX, 0, width, 10, 22050);
    // Map mouseY to resonance/width
    var filterWidth = map(mouseY, 0, height, 0, 90);
    var filter = player.resources.filter;
    filter.set(filterFreq, filterWidth);
    player.resources.noise.pan(2 * mx/width - 1, 0.1)
  }
  else if (player.mode == 2) {
    //filter frequency range/height
    var filterFreq = map(mx, 0, width, 200, 1500);
    //resonance/width
    var filterRes = map(my, 0, height, 15, 23);
    // set filter parameters
    var filter = player.resources.filter;
    filter.set(filterFreq, filterRes);
    player.resources.noise.pan(2 * mx/width - 1, 0.1)
  }
  // else if (player.mode == 3){
  //   //player.resources.carrier.freq(340);
  //   //player.resources.carrier.amp(0);
  //   //player.resources.carrier.start();
  //   var modFreq = map(my,0, height,20,0);
  //   var modAmp = map(mx,0,width,0,1)
  //   player.resources.modulator.freq(modFreq)
  //   player.resources.modulator.amp(modAmp, 0.01)
  //   player.resources.modulator.start()
  // }
}
