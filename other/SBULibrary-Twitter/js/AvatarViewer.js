// TIMER DATA SHARED BY ALL RENDERING
var timeBetweenFrames;
var timer;

// EACH CANVAS IS ASSOCIATED WITH A SPRITE
var sprites;

// CONSTANTS
var DIR;
var SPRITE_NAME_ELEMENT;
var IMAGE_CONFIG_ELEMENT;
var WIDTH_ELEMENT;
var HEIGHT_ELEMENT;
var IMAGE_FILE_ELEMENT;
var ID_ATTRIBUTE;
var FILE_NAME_ATTRIBUTE;
var ANIMATION_STATE_ELEMENT;
var STATE_ELEMENT;
var ANIMATION_SEQUENCE_ELEMENT;
var POSE_ELEMENT;
var IMAGE_ID_ATTRIBUTE;
var DURATION_ATTRIBUTE;

function initConstants()
{
    DIR = "./student_sprites/";
    SPRITE_NAME_ELEMENT = "sprite_name";
    IMAGE_CONFIG_ELEMENT = "image_config";
    WIDTH_ELEMENT = "width";
    HEIGHT_ELEMENT = "height";
    IMAGE_FILE_ELEMENT = "image_file";
    ID_ATTRIBUTE = "id";
    FILE_NAME_ATTRIBUTE = "file_name";
    ANIMATION_STATE_ELEMENT = "animation_state";
    STATE_ELEMENT = "state";
    ANIMATION_SEQUENCE_ELEMENT = "animation_sequence";
    POSE_ELEMENT = "pose";
    IMAGE_ID_ATTRIBUTE = "image_id";
    DURATION_ATTRIBUTE = "duration";
}

function Pose(initId, initDuration)
{
    this.id = initId;
    this.duration = initDuration;
}

function Sprite(initCanvas, initWidth, initHeight, initImagesList, initStates, initNumStates)
{
    this.canvas = initCanvas;
    this.width = initWidth;
    this.height = initHeight;
    this.imagesList = initImagesList;
    this.states = initStates;
    this.numStates = initNumStates;
    this.currentStateIndex = 0;
    this.currentState = Object.keys(this.states)[this.currentStateIndex];
    var currentStateData = this.states[this.currentState];
    this.frameIndex = 0;
    this.framesPerFrame = currentStateData[this.frameIndex].duration;
    this.frameCounter = this.framesPerFrame;

    this.getNumStates = function()
    {
        return this.numStates;
    };

    this.getCurrentImage = function()
    {
        var currentStateData = this.states[this.currentState];
        var currentPose = currentStateData[this.frameIndex];
        var currentPoseId = currentPose.id;
        return this.imagesList[currentPoseId];
    };

    this.step = function()
    {
        this.frameCounter--;
        if (this.frameCounter === 0)
        {
            var currentStateData = this.states[this.currentState];
            this.frameIndex++;
            if (this.frameIndex >= currentStateData.length)
                this.frameIndex = 0;
            this.framesPerFrame = currentStateData[this.frameIndex].duration;
            this.frameCounter = this.framesPerFrame;
        }
    };

    this.render = function()
    {
        // CLEAR THE CANVAS
        this.canvas.clearRect(0, 0, 128, 128);

        // GET THE IMAGE TO RENDER
        var imageToRender = this.getCurrentImage();

        // AND RENDER IT
        this.canvas.drawImage(imageToRender, 0, 0);
    }

    this.incState = function()
    {
        this.currentStateIndex++;
        if (this.currentStateIndex >= this.numStates)
            this.currentStateIndex = 0;
        this.currentState = Object.keys(this.states)[this.currentStateIndex];
        var currentStateData = this.states[this.currentState];
        this.frameIndex = 0;
        this.framesPerFrame = currentStateData[this.frameIndex].duration;
        this.frameCounter = this.framesPerFrame;
    }
}

function initAnimator()
{
    // PREPARE THE CONSTANTS
    initConstants();

    // ALL THE SPRITES WILL GO HERE
    sprites = new Array();
}

function addAnimatedCanvas(canvasId)
{
    // INIT THE RENDERING CANVAS
    var avatarCanvas = document.getElementById(canvasId);
    var avatarCanvas2D = avatarCanvas.getContext("2d");

    // LOAD THE XML FILE
    xmlhttp = new XMLHttpRequest();

    var studentDir = DIR + canvasId + "/";
    var xmlFile = studentDir + canvasId + ".xml";
    xmlhttp.open("GET", xmlFile, false);
    xmlhttp.send();
    animatedSpriteDOM = xmlhttp.responseXML;

    // NOW EXTRACT ALL THE SPRITE INFO
    var sprite = extractSprite(avatarCanvas2D, studentDir, animatedSpriteDOM);

    // KEEP THE USER SPRITE AND CANVAS
    sprites[canvasId] = sprite;

    // NOW LISTEN FOR A MOUSE CLICK ON THE CANVAS
    avatarCanvas.sprite = sprite;
    avatarCanvas.addEventListener('click', function() {
        this.sprite.incState();
    });
}

function initTimer()
{
    // AND START THE TIMER
    timeBetweenFrames = 33;
    timer = setInterval(step, timeBetweenFrames);
}

function extractSprite(canvas, dir, spriteDOM)
{
    // GET THE SPRITE WIDTH AND HEIGHT
    var widthTag = spriteDOM.getElementsByTagName(WIDTH_ELEMENT)[0].childNodes[0];
    var widthText = widthTag.nodeValue;
    var width = parseInt(widthText);
    var heightTag = spriteDOM.getElementsByTagName(HEIGHT_ELEMENT)[0].childNodes[0];
    var heightText = heightTag.nodeValue;
    var height = parseInt(heightText);

    // GET ALL THE SPRITE IMAGES
    var spriteImageTags = spriteDOM.getElementsByTagName(IMAGE_FILE_ELEMENT);
    var spriteImages = new Array();
    for (var i = 0; i < spriteImageTags.length; i++)
    {
        var imageTag = spriteImageTags[i];
        var attributes = imageTag.attributes;
        var idAtt = attributes.getNamedItem(ID_ATTRIBUTE);
        var idText = idAtt.value;
        var id = parseInt(idText);
        var spriteImageAtt = attributes.getNamedItem(FILE_NAME_ATTRIBUTE);
        var spriteImageText = spriteImageAtt.value;
        spriteImages[id] = new Image();
        spriteImages[id].src = dir + spriteImageText;
    }

    // AND NOW THE ANIMATION STATES
    var animationStateTags = spriteDOM.getElementsByTagName(ANIMATION_STATE_ELEMENT);
    var animationStates = new Array();
    var statesCounter = 0;
    for (var i = 0; i < animationStateTags.length; i++)
    {
        statesCounter++;
        var stateTag = animationStateTags[i].getElementsByTagName(STATE_ELEMENT)[0].childNodes[0];
        var state = stateTag.nodeValue;
        var poses = new Array();
        var animationSequenceTag = animationStateTags[i].getElementsByTagName(ANIMATION_SEQUENCE_ELEMENT)[0];
        var poseTags = animationSequenceTag.getElementsByTagName(POSE_ELEMENT);
        for (var j = 0; j < poseTags.length; j++)
        {
            var attributes = poseTags[j].attributes;
            var imageIdAtt = attributes.getNamedItem(IMAGE_ID_ATTRIBUTE);
            var imageIdText = imageIdAtt.value;
            var imageId = parseInt(imageIdText);
            var durationAtt = attributes.getNamedItem(DURATION_ATTRIBUTE);
            var durationText = durationAtt.value;
            var duration = parseInt(durationText);
            poses[j] = new Pose(imageId, duration);
        }
        animationStates[state] = poses;
    }
    return new Sprite(canvas, width, height, spriteImages, animationStates, statesCounter);
}

function step()
{
    // GO THROUGH ALL THE SPRITES
    var spriteKeys = Object.keys(sprites);

    for (var i = 0; i < spriteKeys.length; i++)
    {
        var spriteId = spriteKeys[i];
        var sprite = sprites[spriteId];

        // UPDATE THE SPRITE
        sprite.step();

        // AND RENDER IT
        sprite.render();
    }
}