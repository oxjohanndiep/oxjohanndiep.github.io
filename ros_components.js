var ros = new ROSLIB.Ros({
  url: 'ws://10.0.0.1:9090'
});

function init() {
  var viewer = new ROS3D.Viewer({
    divID: 'viewer',
    background: '#000000',
    width: 570,
    height: 400,
    antialias: true
  });

  var viewer_full = new ROS3D.Viewer({
    divID: 'viewer_full',
    background: '#000000',
    width: 1700,
    height: 650,
    antialias: true
  });

  var tfClient = new ROSLIB.TFClient({
    ros: ros,
    angularThres: 0.01,
    transThres: 0.01,
    rate: 10.0,
    fixedFrame: 'map'
  });

  var cloudClient = new ROS3D.PointCloud2({
    ros: ros,
    tfClient: tfClient,
    rootObject: viewer.scene,
    topic: '/points_instant',
    max_pts: 1300000,
    material: { size: 0.05, color: 0xd9d9d9 }
  });

  var cloudClient_full = new ROS3D.PointCloud2({
    ros: ros,
    tfClient: tfClient,
    rootObject: viewer_full.scene,
    topic: '/points_full',
    max_pts: 1300000,
    material: { size: 0.05, color: 0xd9d9d9 }
  });

  var listener_thermal = new ROSLIB.Topic({
    ros: ros,
    name: 'thermal_frames_compressed/compressed',
    messageType: 'sensor_msgs/CompressedImage'
  });

  listener_thermal.subscribe(function (message) {
    console.log('Received message on ' + listener_thermal.name);
    document.getElementById('image_thermal_sub').src =
      "data:image/jpeg;base64," + message.data;
  });

  var listener_raw = new ROSLIB.Topic({
    ros: ros,
    name: 'raw_frames_compressed/compressed',
    messageType: 'sensor_msgs/CompressedImage'
  });

  listener_raw.subscribe(function (message) {
    console.log('Received message on ' + listener_raw.name);
    document.getElementById('image_raw_sub').src =
      "data:image/jpeg;base64," + message.data;
  });  
}

function setTopic() {
  var topic = new ROSLIB.Topic({
    ros: ros,
    name: '/spot_cmd',
    messageType: 'std_msgs/String'
  })

  return topic;
}

function goForward() {
  message = new ROSLIB.Message({
    data: "w"
  });

  var topic = setTopic();
  topic.publish(message);
}

function goBackward() {
  message = new ROSLIB.Message({
    data: "s"
  });

  var topic = setTopic();
  topic.publish(message);
}

function goLeft() {
  message = new ROSLIB.Message({
    data: "a"
  });

  var topic = setTopic();
  topic.publish(message);
}

function goRight() {
  message = new ROSLIB.Message({
    data: "d"
  });

  var topic = setTopic();
  topic.publish(message);
}

function turnRight() {
  message = new ROSLIB.Message({
    data: "e"
  });

  var topic = setTopic();
  topic.publish(message);
}

function turnLeft() {
  message = new ROSLIB.Message({
    data: "q"
  });

  var topic = setTopic();
  topic.publish(message);
}

function startUp() {
  message = new ROSLIB.Message({
    data: "p"
  });

  var topic = setTopic();
  topic.publish(message);
}

function standUp() {
  message = new ROSLIB.Message({
    data: "i"
  });

  var topic = setTopic();
  topic.publish(message);
}

function stopSlow() {
  message = new ROSLIB.Message({
    data: "o"
  });

  var topic = setTopic();
  topic.publish(message);
}

function sitDown() {
  message = new ROSLIB.Message({
    data: "u"
  });

  var topic = setTopic();
  topic.publish(message);
}

function stopFast() {
  message = new ROSLIB.Message({
    data: " "
  });

  var topic = setTopic();
  topic.publish(message);
}

function pickTorch() {
  message = new ROSLIB.Message({
    data: "1"
  });

  var topic = setTopic();
  topic.publish(message);
}

function pickSweep() {
  message = new ROSLIB.Message({
    data: "2"
  });

  var topic = setTopic();
  topic.publish(message);
}

window.onkeypress = function(event) {
  if (event.keyCode == 119) {
    console.log("w");
    document.getElementsByClassName("forward")[0].style.backgroundColor='gray';
    goForward();
    setTimeout(function(){
      document.getElementsByClassName("forward")[0].style.backgroundColor='white';
    }, 300);    
  }

  if (event.keyCode == 115) {
    console.log("s");
    document.getElementsByClassName("backward")[0].style.backgroundColor='gray';
    goBackward();
    setTimeout(function(){
      document.getElementsByClassName("backward")[0].style.backgroundColor='white';
    }, 300);    
  }

  if (event.keyCode == 97) {
    console.log("a");
    document.getElementsByClassName("left")[0].style.backgroundColor='gray';
    goLeft();
    setTimeout(function(){
      document.getElementsByClassName("left")[0].style.backgroundColor='white';
    }, 300);    
  }

  if (event.keyCode == 100) {
    console.log("d");
    document.getElementsByClassName("right")[0].style.backgroundColor='gray';
    goRight();
    setTimeout(function(){
      document.getElementsByClassName("right")[0].style.backgroundColor='white';
    }, 300);    
  }

  if (event.keyCode == 101) {
    console.log("e");
    document.getElementsByClassName("turnright")[0].style.backgroundColor='gray';
    turnRight();
    setTimeout(function(){
      document.getElementsByClassName("turnright")[0].style.backgroundColor='white';
    }, 300);    
  }

  if (event.keyCode == 113) {
    console.log("q");
    document.getElementsByClassName("turnleft")[0].style.backgroundColor='gray';
    turnLeft()
    setTimeout(function(){
      document.getElementsByClassName("turnleft")[0].style.backgroundColor='white';
    }, 300);    
  }

  if (event.keyCode == 112) {
    console.log("p");
    document.getElementsByClassName("start")[0].style.backgroundColor='gray';
    startUp();
    setTimeout(function(){
      document.getElementsByClassName("start")[0].style.backgroundColor='white';
    }, 300);    
  }

  if (event.keyCode == 105) {
    console.log("i");
    document.getElementsByClassName("stand")[0].style.backgroundColor='gray';
    standUp();
    setTimeout(function(){
      document.getElementsByClassName("stand")[0].style.backgroundColor='white';
    }, 300);    
  }

  if (event.keyCode == 111) {
    console.log("o");
    document.getElementsByClassName("stopslow")[0].style.backgroundColor='gray';
    stopSlow();
    setTimeout(function(){
      document.getElementsByClassName("stopslow")[0].style.backgroundColor='white';
    }, 300);    
  }

  if (event.keyCode == 117) {
    console.log("u");
    document.getElementsByClassName("sit")[0].style.backgroundColor='gray';
    sitDown();
    setTimeout(function(){
      document.getElementsByClassName("sit")[0].style.backgroundColor='white';
    }, 300);    
  }

  if (event.keyCode == 32) {
    console.log("[Space]");
    document.getElementsByClassName("stopfast")[0].style.backgroundColor='gray';
    stopFast();
    setTimeout(function(){
      document.getElementsByClassName("stopfast")[0].style.backgroundColor='white';
    }, 300);    
  }

  if (event.keyCode == 49) {
    console.log("1");
    document.getElementsByClassName("torch")[0].style.backgroundColor='gray';
    pickTorch();
    setTimeout(function(){
      document.getElementsByClassName("torch")[0].style.backgroundColor='white';
    }, 300);    
  }
  
  if (event.keyCode == 50) {
    console.log("2");
    document.getElementsByClassName("sweep")[0].style.backgroundColor='gray';
    pickSweep();
    setTimeout(function(){
      document.getElementsByClassName("sweep")[0].style.backgroundColor='white';
    }, 300);    
  }
}
