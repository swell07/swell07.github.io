function setup() {
    createCanvas(710, 200);
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
var MAX_OSC_SIZE = 3;

function getPlayer(uid) {
    if (!players[uid]) {
        //decide mode
       
        //var mode = ceil(random(2));
        // mode is decided
         var mode = 1;

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
    }

}

function stopnotes(uid, mx, my) {
    var player = getPlayer(uid);
    if (player.mode == 1) {
        player.resources.noise.amp(0, 1);

    } else if (player.mode == 2) {
        player.resources.noise.amp(0, 1);
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
    }
}
