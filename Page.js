var firebaseConfig = {
    apiKey: "AIzaSyBgE6YBmHl3TmnzJPV44OjKkMTLd9A1ttE",
    authDomain: "c-95-project.firebaseapp.com",
    databaseURL: "https://c-95-project-default-rtdb.firebaseio.com",
    projectId: "c-95-project",
    storageBucket: "c-95-project.appspot.com",
    messagingSenderId: "512265434057",
    appId: "1:512265434057:web:3e4ec92612fdd78a6eee18"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
var User_Name = localStorage.getItem("User_1");
var Room_Name = localStorage.getItem("Room_Name");
function UpdateLikes(Message_ID){
    console.log("Clicked on Like button - " + Message_ID);
    Button_ID = Message_ID;
    Like = document.getElementById(Button_ID).value;
    Up_Likes = Number(Like) + 1;
    console.log(Up_Likes);

    firebase.database().ref(Room_Name).child(Message_ID).update({
        Like: Up_Likes
    });
}

function getData() { 
    firebase.database().ref("/"+Room_Name).on('value', function(snapshot) { 
    document.getElementById("output").innerHTML = ""; snapshot.forEach(
    function(childSnapshot) { 
        childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
             firebase_message_id = childKey; 
             message_data = childData; 
             //Start code 
             console.log(firebase_message_id);
             console.log(message_data);
            Message = message_data['Message'];
            Likes = message_data['Like'];
            Name_1 = message_data['Name'];
            Name_Tag = "<h4>"+User_Name+"</h4>";
            Message_Tag = "<h4 class='message_h4'>"+Message+"</h4>";
            Likes_Button = "<button class='btn btn-outline-primary' id="+firebase_message_id+" value="+Likes+" onclick='UpdateLikes(this.id)'>";
            Span_Glyph = "<span class='glyphicon glypicon-thumbs-up'>Likes:"+Likes+"</span></button><hr>";
            Row = Name_Tag + Message_Tag + Likes_Button + Span_Glyph;
            document.getElementById("output").innerHTML+= Row;
             //End code 
            } }); }); } 
getData();

function Logout(){
    localStorage.removeItem("User_1");
    localStorage.removeItem("Room_Name");
    window.location = "Login.html";
}

function Send(){
    Msg = document.getElementById("Input_Box").value;
    firebase.database().ref(Room_Name).push({
        Name: User_Name,
        Message: Msg,
        Likes: 0
    });
    document.getElementById("Input_Box").value = "";
}