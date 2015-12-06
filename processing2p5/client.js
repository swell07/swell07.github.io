var ps; //particle system

function setup() {
    createCanvas(screen.width, screen.height);

    var colors = [
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
    ps = new ParticleSystem(createVector(width / 2, 50), 5, colors[floor(random(colors.length))]);
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
        y: mouseY
    })

    //p5
    background(20);
    playnotes('Single_Mode', mouseX, mouseY)
}

function mouseDragged() {
    ps.updateMouse(mouseX, mouseY);
    sendEvent('move', {
        x: mouseX,
        y: mouseY
    })

    //p5
    updatenotes('Single_Mode', mouseX, mouseY)
}

function mouseReleased() {
    ps.updateMouse(mouseX, mouseY);
    ps.isOver = true;
    // ps = null;
    sendEvent('up', {
        x: mouseX,
        y: mouseY
    })
    sendEvents();

    //p5
    background(180);
    stopnotes('Single_Mode', mouseX, mouseY)
}
