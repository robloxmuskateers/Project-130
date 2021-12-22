Hsong = "";
Psong = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
songStatus = "";

function preload() {
    Hsong = loadSound("HarryPotter.mp3");
    Psong = loadSound("PeterPan.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#000000");
    strokeWeight(3);
    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        songStatus.stop();
        if(songStatus == Psong) {
            songStatus = Hsong;
            songStatus.play();
        }
        else {
            songStatus = Hsong;
            songStatus.play();
            document.getElementById("song_name").innerHTML = "Harry Potter Theme";
        }
    }
    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        songStatus.stop();
        if(songStatus == Hsong) {
            songStatus = Psong;
            songStatus.play();
        }
        else {
            songStatus = Psong;
            songStatus.play();
            document.getElementById("song_name").innerHTML = "Peter Pan Song";
        }
    }
}

function modelLoaded() {
    console.log("PoseNet is Operating");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + "; Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + "; Right Wrist Y = " + rightWristY);
    }
}