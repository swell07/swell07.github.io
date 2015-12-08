var waveform = ['sine', 'sawtooth', 'square', 'triangle'];
var filterType = ['lowpass', 'bandpass', 'highpass'];
var delaytime = [0.2, 0.4, 0.8];

function setup() {
    noCanvas();
    noStroke();
}

function draw() {}

var envelopes = {};

function getUserEnvelope(uid) {
    if (envelopes[uid]) {
        return envelopes[uid];
    } else {
        //temp
        var envelope = new p5.Env(random(0, 1), 0.5, Math.random(0, 1), 0.5);
        //TODO: make configuration of a new envelope
        envelopes[uid] = envelope;
        return envelopes[uid];
    }
}

var players = {};
var MAX_OSC_SIZE = 4;

function getPlayer(uid) {
    if (!players[uid]) {
        //decide mode
        //var mode = ceil(random(4));
        // mode is decided
        var mode = 3;

        if (mode == 1) {
          var filter = new p5.BandPass()
          var noise = new p5.Noise()
          noise.disconnect()
          filter.process(noise)

          var res = {
           'filter':filter,
           'noise':noise
           //'reverb':reverb
          }

          players[uid] = {
            //put mode into player
           'mode':mode,
           'resources':res
         }

      } else if (mode == 2) {
            var filter = new p5.LowPass()
            var reverb = new p5.Reverb()
            var noise = new p5.Noise('white')
            noise.disconnect()
            filter.process(noise)

            var res = {
                'filter': filter,
                'noise': noise,
                'reverb': reverb
            }

            players[uid] = {
                'mode': mode,
                'resources': res
            }
        }
        else if (mode == 3){
          var i = floor(random(2))
          var source = new p5.Oscillator(waveform[0])
          var filter = new p5.Filter(filterType[0])
          var modLFO = new p5.Oscillator('sine')
          var delay = new p5.Delay()
          var volume = new p5.Gain()
          var oscVolume = new p5.Gain()
          var feedbackGain = new p5.Gain()
          var modVolume = getAudioContext().createGain ? getAudioContext().createGain() : getAudioContext().createGainNode();
          var compressor = getAudioContext().createDynamicsCompressor();

          source.disconnect();
          filter.disconnect();
          modLFO.disconnect();
          delay.disconnect();
          volume.disconnect();
          oscVolume.disconnect();
          feedbackGain.disconnect();
          compressor.disconnect();

          //palyer init or playnote?????
          modLFO.freq(400);
          delay.delayTime(delaytime[1]);
          delay.feedback(0.4);
          volume.amp(0.8);
          oscVolume.amp(0);
          //feedbackGain.amp(0.6);
          delay.amp(0.6);
          modVolume.gain.value = 500;

          modLFO.connect(modVolume);
          modVolume.connect(source.oscillator.detune);
          source.connect(oscVolume);
          oscVolume.connect(filter);
          filter.connect(compressor);
          filter.connect(delay);
          delay.connect(feedbackGain);
          delay.connect(compressor);
          feedbackGain.connect(delay);
          compressor.connect(volume);
          volume.connect(getAudioContext().destination);

          var res = {
          'source': source,
          'filter': filter,
          'modLFO': modLFO,
          'delay': delay,
          'voluem': volume,
          'oscVolume': oscVolume,
          'feedbackGain': feedbackGain,
          'modVolume': modVolume,
          'compressor': compressor
          }

          players[uid] = {
              'mode': mode,
              'resources': res
          }
        }
    }

    return players[uid]
}

var oscs = [];

function playnotes(uid, mx, my) {
    var player = getPlayer(uid);
    if (player.mode == 1) {
      player.resources.noise.start();
      player.resources.noise.pan(2 * mx/width - 1, 0.1)
      player.resources.noise.amp(0.8, 1);

    } else if (player.mode == 2) {
      player.resources.noise.start();
      player.resources.noise.pan(2 * mx / width - 1, 0.1)
      player.resources.noise.amp(0.8, 1);
    } else if (player.mode == 3) {
      //routeSound(uid);
      player.resources.oscVolume.amp(0.8);
      player.resources.source.start();
    }

}

function stopnotes(uid, mx, my) {
    var player = getPlayer(uid);
    if (player.mode == 1) {
        player.resources.noise.amp(0, 1);
    } else if (player.mode == 2) {
        player.resources.noise.amp(0, 1);
    } else if (player.mode == 3) {
        player.resources.oscVolume.amp(0);
    }

}

function updatenotes(uid, mx, my) {
    var player = getPlayer(uid);
    if (player.mode == 1) {
      var filterFreq = map (my, 0, width, 20, 8000);
      // Map mouseY to resonance/width
      var filterWidth = map(mx, 0, height, 0, 60);
      var filter = player.resources.filter;
      filter.set(filterFreq, filterWidth);
      player.resources.noise.pan(2 * mx/width - 1, 0.1)

    } else if (player.mode == 2) {
        //filter frequency range/height
        var filterFreq = map(mx, 0, width, 200, 1500);
        //resonance/width
        var filterRes = map(my, 0, height, 15, 23);
        // set filter parameters
        var filter = player.resources.filter;
        filter.set(filterFreq, filterRes);
        player.resources.noise.pan(2 * mx / width - 1, 0.1)
    } else if (player.mode == 3) {
        var sourceFreq = map(mx, 0, width, 50, 400);//300, 800
        player.resources.source.freq(sourceFreq);

        var filterFreq = map(my, 0, height, 100, 300);//400,2000
        player.resources.filter.freq(filterFreq);//getFilterFreq(mouseY * 10));//mouseY*10);//
        var filterRes = map(my, 0, height, 15, 5);
        player.resources.filter.res(filterRes);
    }
}

// function routeSound(uid){
//    var player = getPlayer(uid);
//    if (player.mode == 3 ){//|| player.mode == 4){
//     player.resources.modLFO.connect(player.resources.modVolume);
//     player.resources.modVolume.connect(player.resources.source.oscillator.detune);
//     player.resources.source.connect(player.resources.oscVolume);
//     player.resources.oscVolume.connect(player.resources.filter);
//     player.resources.filter.connect(player.resources.compressor);
//     player.resources.filter.connect(player.resources.delay);
//     player.resources.delay.connect(player.resources.feedbackGain);
//     player.resources.delay.connect(player.resources.compressor);
//     player.resources.feedbackGain.connect(player.resources.delay);
//     player.resources.compressor.connect(player.resources.volume);
//     player.resources.volume.connect(getAudioContext().destination);
//  }
// }
