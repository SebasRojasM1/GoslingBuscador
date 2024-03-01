//6. Selectores
const nombre = document.querySelector("#nombre"); //seleccionamos el Select de #nombre
const edad = document.querySelector("#edad");
const minimoPromedio = document.querySelector("#minimo");
const maximoPromedio = document.querySelector("#maximo");
const clanRiwi = document.querySelector("#clanRiwi");
const nivelIngles = document.querySelector("#nivelIngles");
const especialidad = document.querySelector("#especialidad");
const expertoTecnologia = document.querySelector("#expertoTecnologia");
const busqueda = document.querySelector("#busqueda");

const contenedorTarjetas = document.querySelector("#tarjetas");


/*1. Crear dinamicamente valores de los nombres de coders como OPTIONs de SELECT */
coders.forEach((coder) => {
  const opcion = document.createElement("option");
  opcion.value = coder.nombre;
  opcion.textContent = coder.nombre;
  document.querySelector("#nombre").appendChild(opcion);
});

//2. Agregamos las edades a la interfaz 
const max = 45;
const min = max - 30;

for (var i = min; i < max; i++) {
  const opcionEdad = document.createElement("option");
  opcionEdad.value = i;
  opcionEdad.textContent = i;
  document.querySelector("#edad").appendChild(opcionEdad);
}

/* 3. Event listener DOM */
document.addEventListener("DOMContentLoaded", () => {
  showCoders(coders); //showCoders es una funcion que vamos a crear luego. No hay problema si se llama antes de crearla

  selectCoder();
});

//4. funcion para inyectar cards
function showCoders(coders) {
  limpiar();

  coders.forEach((coder) => {
    const coderHtml = document.createElement("p");
    const { imageUrl, nombre, detalle, promedio, especialidad, expertoTecnologia, celular, direccion, id,} = coder; //Destructurar elementos
    //llamamos al atributo que creamos previamente en funcion

    //HTML de las cartas con sus valores destructurados
    coderHtml.innerHTML = `   
        <div class="card" style="width: 18rem;">
            <img src="${imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${detalle}</p>
            </div>
    
            <ul class="list-group list-group-flush">
                <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" name=${nombre} img="${imageUrl}" prom="${promedio}" especialidad="${especialidad}" tec="${expertoTecnologia}" cel="${celular}" dir="${direccion}">Details</a>
                <a href="#" class="btn btn-danger boton"">Hire</a>
            </ul>
        </div>    
        `;
    contenedorTarjetas.appendChild(coderHtml);
  });
}

// 5. Declara objeto con los criterios para la busqueda (Comenzamos a filtrar)

const criteriosSeleccionados = {
  nombreCoder: "",
  edad: "",
  minPromedio: "",
  maxPromedio: "",
  clanRiwi: "",
  nivelIngles: "",
  especialidad: "",
  expertoTecnologia: "",
  buscarCoder: "",
};



//7. Event Listener para Filtrar
nombre.addEventListener("input", (e) => {
    //Se escoge "imput" porque es donde està almacenado (encerrado) en un FORM
  criteriosSeleccionados.nombreCoder = e.target.value; //Extrae el valor de este con target.value
  console.log(criteriosSeleccionados);

  /*8. llamado de funcion FILTER de alto nivel */
  filtrarCoder(); //llamamos la funcion que posteriormente crearemos
});

edad.addEventListener("input", (e) => {
  criteriosSeleccionados.edad = e.target.value;
  console.log(criteriosSeleccionados);

  filtrarCoder();
});

minimoPromedio.addEventListener("input", (e) => {
  criteriosSeleccionados.minPromedio = e.target.value;
  console.log(criteriosSeleccionados);

  filtrarCoder();
});

maximoPromedio.addEventListener("input", (e) => {
  criteriosSeleccionados.maxPromedio = e.target.value;
  console.log(criteriosSeleccionados);

  filtrarCoder();
});

clanRiwi.addEventListener("input", (e) => {
  criteriosSeleccionados.clanRiwi = e.target.value;
  console.log(criteriosSeleccionados);

  filtrarCoder();
});

nivelIngles.addEventListener("input", (e) => {
  criteriosSeleccionados.nivelIngles = e.target.value;
  console.log(criteriosSeleccionados);

  filtrarCoder();
});

especialidad.addEventListener("input", (e) => {
  criteriosSeleccionados.especialidad = e.target.value;
  console.log(criteriosSeleccionados);

  filtrarCoder();
});

expertoTecnologia.addEventListener("input", (e) => {
  criteriosSeleccionados.expertoTecnologia = e.target.value;
  console.log(criteriosSeleccionados);

  filtrarCoder();
});

busqueda.addEventListener("input", (e) => {
  criteriosSeleccionados.nombreCoder = e.target.value;
  console.log(criteriosSeleccionados);

  filtrarCoder();
});

//8.1. Declaracion de mi funcion FILTER de alto nivel
function filtrarCoder() {
  const resultado = coders.filter(filtrarNombre) //usaremos filter y como argumento le pasamos el valor del atributo para filtrar (que no existe)
                          .filter(filtrarEdad)
                          .filter(filtrarNotas)
                          .filter(filtrarClan)
                          .filter(filtrarIngles)
                          .filter(filtrarEspecialidad)
                          .filter(filtrarExpertoTecnologia);

  console.log(resultado);

  const noFound = document.querySelector("#no-found"); //Si no se ha encontrado el usuario, aparece un texto
  if (resultado.length === 0) {                         //Que dice que no se encontró a alguien
    noFound.style.display = "block";  
  } else {
    noFound.style.display = "none";
  }
  showCoders(resultado);
}

//8.2. Declaracion de la funcion hija argumento de la funcion FILTER de alto nivel
function filtrarNombre(coder) {
  if (criteriosSeleccionados.nombreCoder) {
    //si seleccionamos el nombre, que nos filtre por el nombre (en este caso)
    return coder.nombre === criteriosSeleccionados.nombreCoder; /*Retorneme cuando el nombre coincida con NOMBRE del objeto */
  } else {
    //pero si no, no pasarà nada
    return coder;
  }
}
function filtrarEdad(edadC) {
  if (criteriosSeleccionados.edad) {
    return edadC.edad === parseInt(criteriosSeleccionados.edad);
  } else {
    return edadC;
  }
}
function filtrarNotas(promedioC) {
  if (criteriosSeleccionados.minPromedio) {
    return (
      promedioC.promedio <= parseFloat(criteriosSeleccionados.minimo) &&
      promedioC.promedio >= parseInt(criteriosSeleccionados.maxPromedio)
    );
  } else {
    return promedioC;
  }
}
function filtrarClan(clan) {
  if (criteriosSeleccionados.clanRiwi) {
    return clan.clanRiwi === criteriosSeleccionados.clanRiwi;
  } else {
    return clan;
  }
}
function filtrarIngles(nivel) {
  if (criteriosSeleccionados.nivelIngles) {
    return nivel.nivelIngles === criteriosSeleccionados.nivelIngles;
  } else {
    return nivel;
  }
}

function filtrarEspecialidad(especialidadC) {
  if (criteriosSeleccionados.especialidad) {
    return especialidadC.especialidad === criteriosSeleccionados.especialidad;
  } else {
    return especialidadC;
  }
}
function filtrarExpertoTecnologia(expertoTecnologiaC) {
  if (criteriosSeleccionados.expertoTecnologia) {
    return (
      expertoTecnologiaC.expertoTecnologia ===
      criteriosSeleccionados.expertoTecnologia
    );
  } else {
    return expertoTecnologiaC;
  }
}

function limpiar() {
  let z = document.querySelectorAll("p");
  for (let v = 0; v < z.length; v++) {
    z[v].remove();
  }
}



//MODAL
const tbody = document.querySelector("tbody"); //Selector para localizar la tabla
const rowModal = document.createElement("tr"); //Crear tabla

function selectCoder() {
  const coderDetails = document.querySelector("#tarjetas");
  coderDetails.addEventListener("click", showDetail);
}

function showDetail(e) {
  const imagen = e.target.getAttribute("img");
  const prom = e.target.getAttribute("prom");
  const especialidad = e.target.getAttribute("especialidad");
  const tecnologia = e.target.getAttribute("tec");
  const telefono = e.target.getAttribute("cel");
  const direccion = e.target.getAttribute("dir");
  let apto = "";

  if (prom >= 4.5) { //Condicional en que, si la nota es baja, no es apto para remoto
    apto = "Es Apt@ para trabajar remoto.";
  } else {
    apto = "No es Apt@, debe estudiar mas.";
  }

  //Crear la tabla para el MODAL e info
  rowModal.innerHTML = `
  <td>
    <img src="${imagen}" class="card-img-top" >
  </td>

  <td>${apto}</td>
  <td>${especialidad}</td>
  <td>${expertoTecnologia}</td>
  <td>${tecnologia}</td>
  <td>${telefono}</td>
  <td>${direccion}</td>
  `
  tbody.appendChild(rowModal);
}


/* --- HIRE (Aprobado) --- */
let arrayCards = []; //Arreglo para almacenar a quienes iran contratados

/*Selectores */
const cards = document.querySelector("#tarjetas");
const tBodies = document.querySelector("#tBodies");
const deleteListCards = document.querySelector("#deleteListCards"); 
const deleteAll = document.querySelector("#all")

/*Event listener */
cards.addEventListener("click", selectCard); //Cuando se le de click a "cards (#tarjetas)", se ejecuta la funcion selectCard
deleteListCards.addEventListener("click", deleteCard);//Cuando se le de click a "#deleteCards (un table)", se ejecuta la funcion deleteListCards
deleteAll.addEventListener("click", deleteCoders)

function selectCard(e) {
  e.preventDefault();

  if (e.target.classList.contains("boton")) {
    const electedCoder = e.target.parentElement.parentElement; //Está accediendo al elemento padre del padre
    detail(electedCoder);
  }
}


function detail(electedCoder) {
  const coderDetail = {
    imagen: electedCoder.querySelector("img").src, //Está accediendo a imagen
    nombre: electedCoder.querySelector("h5").textContent, // "" nombre
    detalle: electedCoder.querySelector("p").textContent, // "" detalle
    id: electedCoder.querySelector(".boton").getAttribute("id"), // "" nombre
  }
  arrayCards = [...arrayCards, coderDetail]; //Está refrescando el arreglo, metiendo el nuevo coder con el nuevo coder
  console.log(arrayCards);

  injectingCoderHtml(); //Se ejecuta, inyectando a los coders
}


function deleteCard(e) {
  if (e.target.classList.contains("deleteCard")) { //Si el EVENTO contiene la clase "deleteCard"...
    const coderToDelete = e.target.getAttribute("id"); //extraer el atributo ID Y se guarda el valor en coderToDelete 
    arrayCards = arraysCards.filter((cd) => //Filtrar el arrayCards. filter() crea un nuevo array con todos los elementos que cumplen la condición implementada por la función proporcionada
      cd.id !== coderToDelete // La condición es que el id del elemento no sea igual a coderToDelete.
    );

    injectingCoderHtml();
  }

  if (e.target.classList.contains("cleanAll")) {
    arraysCards = [];
    cleanHtml();
  }
}

function deleteCoders(e) {
  arrayCards = []
  tBodies.innerHTML = ""
}


function injectingCoderHtml() { //Funcion para inyectar la carta con la info del estudiante al MODAL
  cleanHtml();

  arrayCards.forEach((card) => { //Se accede con imagen, nombre, detalle, id de la funcion Detail -> CoderDetail
    const { imagen, nombre, detalle, id } = card;
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>
            <img src='${imagen}' width='200px'>
        </td>
        <td>
            <p>${nombre}</p>
        </td>
        <td>
            <p>${detalle}</p>
        </td>
        <td>
            <a href="#" class="deleteCards btn btn-danger id="${id}">ELIMINAR</a>
        </td>
        `;

    tBodies.appendChild(row);
  });
}

function cleanHtml() {
  tBodies.innerHTML = "";
}
