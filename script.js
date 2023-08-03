const firebaseConfig = {
    apiKey: "AIzaSyDruLIzWqillLkw_bv3_jYqh3vwS8PcWtA",
    authDomain: "datos-de-formulario-3d1c0.firebaseapp.com",
    projectId: "datos-de-formulario-3d1c0",
    storageBucket: "datos-de-formulario-3d1c0.appspot.com",
    messagingSenderId: "361161205383",
    appId: "1:361161205383:web:229c3d6f367eb3f930fa22",
    measurementId: "G-1N0J59J5J8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit',(event) =>{
    event.preventDefault()

    //Validar nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'Por favor ingresar un nombre'
        errorNombre.classList.add('error-message')
    }else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    // Validar correo
    let entradaCorreo = document.getElementById('email')
    let errorCorreo = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(entradaCorreo.value)){
        errorCorreo.textContent = 'Por favor ingresar un correo valido'
        errorCorreo.classList.add('error-message')
    }else{
        errorCorreo.textContent = ''
        errorCorreo.classList.remove('error-message')
    }

    // Validar contraseña
    let entradaPw = document.getElementById('password')
    let errorPw = document.getElementById('passwordError')
    let pwPattern = /^(?=.*\d).{4,8}$/;
    if(!pwPattern.test(entradaPw.value)){
        errorPw.textContent = 'La contraseña debe tener al menos 4 caracteres y, al menos 1 debe ser numerico.'
        errorPw.classList.add('error-message')
    }else{
        errorPw.textContent = ''
        errorPw.classList.remove('error-message')
    }

    // Si no hubo errores
    if(!errorNombre.textContent && !errorCorreo.textContent && !errorPw.textContent){

        db.collection("users").add({
            nombre: entradaNombre.value,
            email: entradaCorreo.value,
            password: entradaPw.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

        alert('El formulario se ha enviado exitosamente.');
        document.getElementById('formulario').reset();
    }
})