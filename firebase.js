// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
//PALOMO 
var firebaseConfig = {
  apiKey: "AIzaSyAxLo6k-XfxdR6S04FZS_xaWSJ1xTRuH-w", //have the keys ....
  authDomain: "denoh-998d9.firebaseapp.com", // will change
  projectId: "denoh-998d9", // 
  storageBucket: "denoh-998d9.appspot.com",
  messagingSenderId: "19013337291",
  appId: "1:19013337291:web:99508cd3b501901b415b4e",
  measurementId: "G-RJLSLW3XT5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


console.log(firebase);

chrome.runtime.onMessage.addListener((msg, sender, response) => {

  if(msg.command == "fetch"){
    var domain = msg.data.domain;
    var enc_domain = btoa(domain);
    firebase.database().ref('/domain/'+enc_domain).once('value').then(function(snapshot){
      response({type: "result", status: "success", data: snapshot.val(), request: msg});
    });

  }

  //submit coupon data..
  if(msg.command == "post"){

    var domain = msg.data.domain;
    var enc_domain = btoa(domain);
    var code = msg.data.code;
    var desc = msg.data.desc;

    try{

      var newPost = firebase.database().ref('/domain/'+enc_domain).push().set({
        code: code,
        description: desc
      });

      var postId = newPost.key;
      response({type: "result", status: "success", data: postId, request: msg});

    }catch(e){
      console.log("error:", e);
      response({type: "result", status: "error", data: e, request: msg});

    }
  }

  return true;


})
