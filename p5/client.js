var ps; //particle system
var colors;
var userId = clientId ? clientId : 'Single';

function getIndexFromId(userId, N) { //return one int from 0,1,...,N-1
    return userId ? userId[userId.length - 1] % N : 0;
}

function setup() {
    createCanvas(screen.width, screen.height);
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

function mousePressed() {
    ps.isOver = false;
    ps.updateMouse(mouseX, mouseY);
    sendEvent('down', {
        x: mouseX,
        y: mouseY,
        h: height,
        w: width
    })

    //p5
    background(20);
    playnotes(userId, mouseX, mouseY, width, height)
}

function mouseDragged() {
    ps.updateMouse(mouseX, mouseY);
    sendEvent('move', {
        x: mouseX,
        y: mouseY,
        h: height,
        w: width
    })

    //p5
    updatenotes(userId, mouseX, mouseY, width, height)
}

function mouseReleased() {
    ps.updateMouse(mouseX, mouseY);
    ps.isOver = true;
    // ps = null;
    sendEvent('up', {
        x: mouseX,
        y: mouseY,
        h: height,
        w: width
    })
    sendEvents();

    //p5
    background(180);
    stopnotes(userId, mouseX, mouseY, width, height)
}
