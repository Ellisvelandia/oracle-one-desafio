
//boton copiar

let botonCopiar = document.querySelector(".boton-copiar-invisible");
let avisoTextoCopiado = document.querySelector(
  ".aviso-texto-copiado-invisible"
);
let clase1 = "aviso-texto-copiado-invisible";
let clase2 = "aviso-texto-copiado-visible";

botonCopiar.addEventListener("click", function (event) {
  event.preventDefault();
  let codigoACopiar = document.querySelector(".texto-salida");
  copiarAlPortapapeles(codigoACopiar);
  aparecerDesaparecerAviso(clase1, clase2);
  setTimeout(function () {
    avisoTextoCopiado.classList.replace(clase2, clase1);
  }, 1300);
});

function aparecerDesaparecerAviso(clase1, clase2) {
  avisoTextoCopiado.classList.replace(clase1, clase2);
}



//boton desencriptar

let botonDesencriptar = document.querySelector(".boton-desencriptar");

botonDesencriptar.addEventListener("click", function (event) {
  event.preventDefault();

  let capturarTexto = document.querySelector(".ingresar-texto");

  if (
    capturarTexto.value.length === 0 ||
    capturarTexto.value.trim().length === 0 ||
    validarEntrada(capturarTexto.value)
  ) {
    return;
  } else {
    let vocales = ["e", "i", "a", "o", "u"];
    let reemplazo = ["enter", "imes", "ai", "ober", "ufat"];
    let textoDesencriptado = encriptarDesencriptarTexto(
      capturarTexto.value,
      reemplazo,
      vocales
    );
    let cuadroTexto = document.querySelector(".reemplazar-cuadro");
    cuadroTexto.innerHTML = '<textarea readonly class="texto-salida">';
    let textoSalida = document.querySelector(".texto-salida");
    textoSalida.innerText = textoDesencriptado;
    capturarTexto.value = "";

    if (validacionBotonCopiar === 0) {
      botonCopiar.classList.replace(
        "boton-copiar-invisible",
        "boton-copiar-visible"
      );
      validacionBotonCopiar++;
    }
  }
});



//boton encriptar

let botonEncriptar = document.querySelector(".boton-encriptar");
let validacionBotonCopiar = 0;

botonEncriptar.addEventListener("click", function (event) {
  event.preventDefault();

  let capturarTexto = document.querySelector(".ingresar-texto");
  //Uso este if para evitar que se ingrese texto vacío
  if (
    capturarTexto.value.length === 0 ||
    capturarTexto.value.trim().length === 0 ||
    validarEntrada(capturarTexto.value)
  ) {
    return;
  } else {
    let vocales = ["e", "i", "a", "o", "u"]; //defino las vocales a usar en su orden.
    let reemplazo = ["enter", "imes", "ai", "ober", "ufat"]; // defino los reemplazos de cada vocal (también en orden).
    let textoEncriptado = encriptarDesencriptarTexto(
      capturarTexto.value,
      vocales,
      reemplazo
    ); // paso la función para encriptar/desencriptar.
    let cuadroTexto = document.querySelector(".reemplazar-cuadro"); // elijo el cuadro donde se escribira el texto transcripto.
    cuadroTexto.innerHTML = '<textarea readonly class="texto-salida">'; //creo el elemento con la clase ya agregada.
    let textoSalida = document.querySelector(".texto-salida"); //creo un selector con esa clase.
    textoSalida.innerText = textoEncriptado; //al elemento le paso como parametro el texto encriptado.
    capturarTexto.value = ""; //reinicio el textarea para que este libre para escribir algo nuevo.

    let botonCopiar = document.querySelector(".boton-copiar-invisible"); //genero un selector para el botón oculto.
    if (validacionBotonCopiar === 0) {
      // a tráves de este if valido si está oculto, si esta oculto, lo muestro con un cambio de clase.
      botonCopiar.classList.replace(
        "boton-copiar-invisible",
        "boton-copiar-visible"
      );
      validacionBotonCopiar++;
    }
  }
});

//encriptar desencriptar funciones

function encriptarDesencriptarTexto(texto, expresion1, expresion2) {
  for (let i = 0; i < expresion1.length && i < expresion2.length; i++) {
    expresion1[i] = new RegExp(expresion1[i], "g");
    texto = texto.replace(expresion1[i], expresion2[i]);
  }

  return texto;
}

function copiarAlPortapapeles(elemento) {
  let oculto = document.createElement("textarea");

  oculto.innerHTML = elemento.innerHTML;

  document.body.appendChild(oculto);

  oculto.select();

  document.execCommand("copy");

  document.body.removeChild(oculto);
}


function visibilizarError(elemento, textoEscrito, clase) {
  if (validarEntrada(textoEscrito)) {
    elemento.classList.add(clase);
  } else {
    elemento.classList.remove(clase);
  }
}

let capturarTexto = document.querySelector(".ingresar-texto");
let avisoEnRojo = document.querySelector(".aviso-minusculas");

capturarTexto.addEventListener("input", function () {
  if (this.value.length >= 0) {
    visibilizarError(this, this.value, "error");
    visibilizarError(avisoEnRojo, this.value, "error-aviso");
  }
});


function validarEntrada(cadena) {
    const caracteresNoPermitidos = /[^a-z ]/;
    return caracteresNoPermitidos.test(cadena);
  }
  