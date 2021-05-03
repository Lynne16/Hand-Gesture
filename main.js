Webcam.set({
    width: 350,
    height: 300,
    Image_format: 'png',
    png_quality: 90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_img" src="'+data_uri+'"/>'
    });
}

console.log('ml5 version:',ml5.version );

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/weDtscK2y/model.json', modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}
var Prediction="";
function speak(){
    var synth=window.speechSynthesis;
    speak_data="The Prediction is "+Prediction;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        Prediction =results[0].label;
        speak();
        if(Prediction == "amazing "){
            document.getElementById("update_gesture").innerHTML="&#128076;";
        }
        if(Prediction == "best"){
            document.getElementById("update_gesture").innerHTML="&#128077;";
        }
        if(Prediction == "victory "){
            document.getElementById("update_gesture").innerHTML="&#9996;";
        }

}
}