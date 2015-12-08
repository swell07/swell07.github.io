var users = {}; //users HashMap
var colors = {}

function getIndexFromId(userId, N) { //return one int from 0,1,...,N-1
    return userId ? (userId[userId.length - 1] % N) : 0;
}


function setup() {
    createCanvas(displayWidth, displayHeight);
    frameRate(30);
    // createCanvas(screen.width, screen.height)
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

}

function draw() {
    background(0);
    //iteration
    for (var userId in users) {
        var ps = users[userId]
        if (ps) {
            ps.addParticle();
            ps.updateMouse(ps.mseX, ps.mseY);
        }
    }
}

//void initUser(String keys, float x, float y)
function initUser(userId, x, y, cw, ch) {
    //sound
    playnotes(userId, x, y, cw, ch)

    var ps = users[userId]
    if (!ps) {
        var index = getIndexFromId(userId, 3); //0,1,2
        ps = new ParticleSystem(createVector(width / 2, 50), 5, colors[index]);
    }
    ps.isOver = false;
    ps.updateMouse(x, y);
    users[userId] = ps;
}

function updateUser(userId, x, y, cw, ch) {
    //sound
    updatenotes(userId, x, y, cw, ch)
    var ps = users[userId]
    if (ps) {
        ps.updateMouse(x, y)
        users[userId] = ps;
    }
}

function delUser(userId, x, y, cw, ch) {
    //sound
    stopnotes(userId, x, y, cw, ch)
    var ps = users[userId]
    if (ps) {
        ps.updateMouse(x, y)
        ps.isOver = true;
        users[userId] = ps;
    }
}
