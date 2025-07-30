let numSecreto = 0;
let intentos = 0;
let numerosSecretos = [];
let cambiar = false;
let numeroMax = 5;


function asignarTextoElem(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML= texto;
    return;
};

function limpiarCaja() {
    //para las id usando querySelector
    document.querySelector('#valorUsuario').value = '';
}



function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMax) + 1;
    //verificar si se llego al maximo de intentos
    if(numerosSecretos.length == numeroMax){
        asignarTextoElem('p', 'Ya adivinaste todos los números. Reinicia o cambia la dificultad.');
        document.getElementById('dificultad').removeAttribute('disabled'); //desbloquear el boton de cambiar dificultad
        document.getElementById('intentar').disabled = true;
        return null ;
    }


    else {  //hacer que no se repitan los numeros
        if(numerosSecretos.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }
        else{//guardar los numeros
            numerosSecretos.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function verificarIntento(){
    let numUsuario = parseInt(document.getElementById('valorUsuario').value);

    //si es el mismo numero inhabilitar el boton intentar y activar del de reiniciar
    if(numUsuario === numSecreto){
        asignarTextoElem('p',`Acertaste el numero, en ${intentos} ${intentos == 1? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('intentar').disabled = true;
        
    }
    else{
            asignarTextoElem('p',`El numero secreto es ${numUsuario > numSecreto ? 'menor' : 'mayor'}`);
            intentos++;
            limpiarCaja();
    }

    return;
};



function cambiarDificultad(){
    asignarTextoElem('p','Indique el numero maximo porfavor');
    document.getElementById('reiniciar').removeAttribute('disabled'); //habilitar reiniciar
    document.getElementById('dificultad').disabled = true; //deshabilitar cambiar de dificultad;
    document.getElementById('intentar').disabled = true;
    cambiar = true;
}

function condicionesIniciales(){   
    asignarTextoElem('h1', 'Juego del numero secreto');
    asignarTextoElem('p', `Indica un numero del 1 al ${numeroMax}`);
    numSecreto = generarNumeroSecreto();
    
    if (numSecreto === null) { // Si generarNumeroSecreto retorna null, significa que ya se adivinaron todos
        document.getElementById('reiniciar').removeAttribute('disabled');
        return;
    }
    
    intentos = 1;
    document.getElementById('intentar').disabled = false; 
    document.getElementById('dificultad').disabled = true; 
};




function nuevoJuego() {
    //por si quiero cambiar la dificultad
    if (cambiar == true) {
        nuevoJuegoDificultad();
        document.getElementById('reiniciar').disabled = true;

    } else {
        document.getElementById('reiniciar').disabled = true;
        

        //para que se ejecute cuando se quiere jugar en la misma dificultad
        if(numSecreto == null){
            console.log(numSecreto);
            numSecreto = 0;
            numerosSecretos = [];
            condicionesIniciales();
        }


        else{
            limpiarCaja();
            condicionesIniciales();
        }
         
        
    }
}

//funcion para adoptar una nueva dificultad
function nuevoJuegoDificultad() {
    numeroMax = parseInt(document.getElementById('valorUsuario').value);
    cambiar = false;
    numerosSecretos = [];
    numSecreto = 0;
    limpiarCaja();
    condicionesIniciales();
}

condicionesIniciales();



