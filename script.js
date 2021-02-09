//Borrando el outline de los botones de una manera que sigue siendo accesible 
(function(document, window){
	if (!document || !window) {
		return;
	}
	
	var styleText = '::-moz-focus-inner{border:0 !important;}:focus{outline: none !important;';
	var unfocus_style = document.createElement('STYLE');

	window.unfocus = function(){
		document.getElementsByTagName('HEAD')[0].appendChild(unfocus_style);

		document.addEventListener('mousedown', function(){
			unfocus_style.innerHTML = styleText+'}';
		});
		document.addEventListener('keydown', function(){
			unfocus_style.innerHTML = '';
		});
	};

	unfocus.style = function(style){
		styleText += style;
	};

	unfocus();
})(document, window);

// Lo que buscamos con Javascript es:
//Al hacer click en siguiente , la barra deberá moverse al siguiente paso o número
//Al hacer click en anterior, la barra debe moverse al paso anterior siempre que no esté en 1
//Identificamos dos acciones: 1.Responder a los botones 2.Que la barra progrese a medida que pulsemos esos botones

//Primero, alamcenamos en variables aquellos que quermeos modificar del DOM
const progress = document.getElementById('progress') //El div con id='progress'
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const circles = document.querySelectorAll('.circle')

//Añadimos los eventos a los botones

let currentActive = 1
//Lo situamos en 1 porque es donde empieza
// Nos indica donde está la clase active en todo momento

next.addEventListener('click', () => {
    currentActive++
    
    if (currentActive > circles.length) { //Para que no supere al número máximo de circulos que tengamos y se detenga en el último

        currentActive = circles.length
    }

    update()
})

prev.addEventListener('click', () => {
    currentActive--
    
    if (currentActive < 1) { //Para que no supere al número máximo de circulos que tengamos y se detenga en el último
        
        currentActive = 1
    }

    update()
})
 
/* Aquí es donde se centra la lógica del problema, recorremos el array circles e interactuamos con la clase active en todo momento*/
function update(){
    circles.forEach((circle, index)=>{ //Vamos a comprobar que el index de cada circulo sea menor que el currentActive
        if(index < currentActive){
            circle.classList.add('active')
        } else {
            circle.classList.remove('active')
        }
    })

    const actives = document.querySelectorAll('.active')
    //Para el porcentaje del width, hacemos una proporcion entre los circles que tengamos en ese momento con la clase active entre el total de circulos que tengamos y multiplicamos por 100
    progress.style.width = ((actives.length -1) /(circles.length-1))  * 100 + '%'

    //Vamos a habilitar/deshabilitar los botones según en qué paso estemos.
    if(currentActive === 1){
        prev.disabled = true
    } else if (currentActive === circles.length){
        next.disabled = true
    }else {
        prev.disabled = false
        next.disabled = false
    }
}
