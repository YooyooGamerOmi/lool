song="";
song1 = '';

leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
score_leftWrist = 0;
score_RightWrist = 0;


function preload(){
    song=loadSound("wellerman.mp3");
    song1 = loadSound('andha.mp3');
    
}
function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide()
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose",gotPoses);

    
}
function draw(){
image(video,0,0,600,500);
fill("cyan");
stroke("rgb(255,99,71)");
if(score_RightWrist > 0.2){


circle(rightWristX,rightWristY,20);
if(rightWristY >0 && rightWristY > 100)
{  if(song.isPlaying() <true   ){
    song.stop();
 song1.play();
}
}
}


if(score_leftWrist > 0.2){
circle(leftWristX,leftWristY,20);
InNumberleftWristY = Number(leftWristY);
remove_decimals = floor(InNumberleftWristY);
volume = remove_decimals/500;
if(song1.isPlaying()<true  ){
song1.stop();
song.play();
}



}

}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);


}
function pause(){
    song.pause();
    song1.pause();
    song,song1.stop();
}

function modelLoaded() {
    console.log("Posenet is initialized");
}

function gotPoses(results){
    if(results.length > 0 ){
        console.log(results);
        score_RightWrist = results[0].pose.keypoints[10].score;
        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("score_leftWrist = " + score_leftWrist);
        leftWristX= results[0].pose.leftWrist.x
        leftWristY= results[0].pose.leftWrist.y
        console.log("leftWristX = "+ leftWristX +" leftWristY = " + leftWristY);
        rightWristX= results[0].pose.rightWrist.x
        rightWristY= results[0].pose.rightWrist.y
        console.log("rightWristX = "+ rightWristX +" rightWristY = " + rightWristY);

    }
}
