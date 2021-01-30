// Your web app's Firebase configuration
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
var UserName_1 = localStorage.getItem("User_1");
document.getElementById("Username_Display").innerHTML = "Welcome, " + UserName_1;
function LogOut(){
  localStorage.removeItem("User_1");
  localStorage.removeItem("Room_Name");
  window.location = "Login.html";
}
function getData() {firebase.database().ref("/").on('value',function(snapshot) {document.getElementById("Output").innerHTML ="";snapshot.forEach(function(childSnapshot) {childKey =
  childSnapshot.key;
  Room_Names = childKey;
  //Start code
  console.log("Room Names: " + Room_Names);
  Row = "<div class='room_name' id="+ Room_Names +" onclick='redirectToRoomName(this.id)'>#"+ Room_Names +"</div><hr>";
  document.getElementById("Output").innerHTML += Row;
  //End code
});});
}
getData();

function redirectToRoomName(Name){
  console.log(Name);
  localStorage.setItem("Room_Name", Name);
  window.location = "Page.html";
}

function Add_Room(){
  Add_User = document.getElementById("Input_Room_Name").value;
  console.log(Add_User);
  firebase.database().ref("/").child(Add_User).update({
      Purpose: "Adding Room"
  });
  document.getElementById("Output").innerHTML += Add_User;
}
