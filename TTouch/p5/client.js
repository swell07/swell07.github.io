var ps; //particle system
var colors;
var userId = clientId ? clientId : 'Single';

function getIndexFromId(userId, N) { //return one int from 0,1,...,N-1
    return userId ? userId[userId.length - 1] % N : 0;
}

function setup() {
    createCanvas(displayWidth, displayHeight);
    frameRate(60);
    // createCanvas(screen.width, screen.height);
    colors = [
        [
            color(130, 0, 255), color(255, 0, 255), color(0, 130, 255), color(0, 255, 255)
        ],
        [
            color(130, 255, 0), color(255, 255, 0), color(0, 255, 130), color(0, 255, 255)
        ],
        [
            color(255, 130, 0), color(255, 255, 0), color(255, 0, 130), color(255, 0, 255)
        ]
    ];

    ps = new ParticleSystem(createVector(width / 2, 50), 5, colors[getIndexFromId(userId, 3)]);
    ps.isOver = true;
}

function draw() {
    // blendMode(ADD);
    background(0);
    if (ps) {
        ps.addParticle();
        ps.updateMouse(ps.mseX, ps.mseY);
    }
}

function touchStarted() {
    ps.isOver = false;
    ps.updateMouse(touchX, touchY);
    sendEvent('down', {
        x: touchX,
        y: touchY,
        h: height,
        w: width
    })

    //p5
    background(20);
    playnotes(userId, touchX, touchY, width, height)
}

function touchMoved() {
    ps.updateMouse(touchX, touchY);
    sendEvent('move', {
        x: touchX,
        y: touchY,
        h: height,
        w: width
    })

    //p5
    updatenotes(userId, touchX, touchY, width, height)
}

function touchEnded() {
    ps.updateMouse(touchX, touchY);
    ps.isOver = true;
    // ps = null;
    sendEvent('up', {
        x: touchX,
        y: touchY,
        h: height,
        w: width
    })
    sendEvents();

    //p5
    background(180);
    stopnotes(userId, touchX, touchY, width, height)
}
