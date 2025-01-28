import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

//configuracion de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAj0QXYh7DCdcMQpwOBUdPyfg6CIcAqXRc",
    authDomain: "reactfirebase-2a3ca.firebaseapp.com",
    projectId: "reactfirebase-2a3ca",
    storageBucket: "reactfirebase-2a3ca.firebasestorage.app",
    messagingSenderId: "559338654545",
    appId: "1:559338654545:web:24998f087381858e89e170",
    measurementId: "G-Y9R7564LVY"
  };

  //Inicializar Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const storage = firebase.storage();

  //Registro de usuario
  function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("User registered successfully!");
            document.getElementById(authForm).reset();
            document.getElementById("authSection").style.display = "none";
            document.getElementById("uploadSection").style.display = "block";
        })
        .catch(() => {
            alert(error.message)
        });
  }

  //login de usuario
  function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("User logged in successfully!");
            document.getElementById(authForm).reset();
            document.getElementById("authSection").style.display = "none";
            document.getElementById("uploadSection").style.display = "block";
        })
        .catch(() => {
            alert(error.message)
        });
  }

  //subida de archivo
  function uploadFile() {
    const file =  document.getElementById("fileInput").files[0];
    if(!file){
        alert("Please choose a file first.")
    }
    
    const storageRef = storage.ref("uploads" + file.name);
    const uploadTask = storageRef.put(file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
        },
        (error) => {
            alert(error.message);
        },
        () => {
            uploadTask.snapshot.ref.get.DownLoadURL().then((DownLoadURL)=> {
                alert("File upload successfully! File URL: " + DownLoadURL);
                document.getElementById("uploadForm").reset();
            });
        }
    );
  }

  //Ocultar seccion de subida si no hay usuario autenticado
  auth.onAuthStateChanged((user) => {
    if(user) {
        document.getElementById("authSection").style.display = "none";
        document.getElementById("uploadSection").style.display = "block";
    } else {
        document.getElementById("authSection").style.display = "block";
        document.getElementById("uploadSection").style.display = "none";
    }
  });