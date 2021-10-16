//ENTORNO

//GUARDAMOS CANVAS Y CREAMOS UN CONTEXTO 2D
var canvas = document.getElementById("juego");

var contexto = canvas.getContext("2d");

//CREAMOS VARIABLES PARA EL MOVIMIENTO DE LA BOLA
var x = canvas.width/2;
var y = canvas.height-30;

var movimientoX = 2;
var movimientoY = -2;

var radioBola = 10;

//CREAMOS VARIABLES PARA LA DEFINICION DEL STICK
var stickHeight = 10;
var stickWidth = 75;
var stickX = (canvas.width-stickWidth)/2;

var izquierdaPulsado = false;
var derechaPulsado = false;

//CREAMOS EVENTOS PARA PULSACIÓN DE TECLAS Y MOVIMIENTO DE STICK
const pulsarTecla = (e) =>{
    if(e.keyCode == 39) {
        derechaPulsado = true;
    }
    else if(e.keyCode == 37) {
        izquierdaPulsado = true;
    }
}

const levantarTecla = (e) =>{
    if(e.keyCode == 39) {
        derechaPulsado = false;
    }
    else if(e.keyCode == 37) {
        izquierdaPulsado = false;
    }
}

document.addEventListener("keydown", pulsarTecla, false);
document.addEventListener("keyup", levantarTecla, false);

//CREAMOS VARIABLES PARA LA CREACION DE LOS BLOQUES SUPERIORES
var bloquesFilas = 3;
var bloquesColumnas = 5;
var bloqueWidth = 75;
var bloqueHeight = 20;
var bloquePadding = 10;
var bloqueMarginTop = 30;
var bloqueMarginLeft = 30;

//CREAMOS UN ARRAY DE ARRAYS, TENIENDO EN CUENTA LAS COLUMNAS Y LAS FILAS DECLARADAS ARRIBA. EN CADA POSICION DE ESTE ARRAY PINTAREMOS UN BLOQUE
var bloques = [];
for(columna = 0; columna < bloquesColumnas; columna++) {
    bloques[columna] = [];
    for(fila = 0; fila < bloquesFilas; fila++) {
        //GUARDAMOS UN OBJETO CON POSICIONES X E Y EN CADA POSICION DEL ARRAY
        bloques[columna][fila] = { x: 0, y: 0, status: 1 };
    }
}

var marcador = 0;

//ALGORITMO


//CREACIÓN DE BOLA
const dibujarBola = () =>{
    contexto.beginPath();
    contexto.arc(x, y, radioBola, 0, Math.PI*2);//DIBUJA UN ARCO. COORDENADAS X E Y DE LA ESQUINA SUPERIOR IZQUIERDA DEL LIENZO, RADIO DEL ARCO, ANGULO INICIAL Y FINAL Y DIRECCIÓN DE DIBUJADO (OPCIONAL, NO APARECE EN ESTE CASO)
    contexto.fillStyle = "#0095DD";
    contexto.fill();
    contexto.closePath();
}
//CREACION DEL STICK
const dibujarStick = () =>{
    contexto.beginPath();
    contexto.rect(stickX, canvas.height-stickHeight, stickWidth, stickHeight);//DIBUJA UN RECTANGULO. COORDENADAS EJE X E Y CON RESPECTO A ESQUINA SUPERIOR IZQUIERDA, Y WIDTH Y HEIGHT
    contexto.fillStyle = "#0095DD";
    contexto.fill();
    contexto.closePath();
}
//CREACION DE LOS BLOQUES
const dibujarBloques = () =>{
    //RECORREMOS EL ARRAY DE BLOQUES Y DIBUJAMOS UN BLOQUE POR CADA POSICIÓN
    for(columna = 0; columna < bloquesColumnas; columna++) {
        for(fila = 0; fila < bloquesFilas; fila++) {
            //COMPROBAMOS SI EL STATUS DE CADA BLOQUE ES 1 ANTES DE SER PINTADO
            if (bloques[columna][fila].status == 1) {
                //GENERAMOS LAS POSICIONES X E Y DE CADA BLOQUE
                var bloqueX = (columna * (bloqueWidth + bloquePadding)) + bloqueMarginLeft;
                var bloqueY = (fila * (bloqueHeight + bloquePadding)) + bloqueMarginTop;
                bloques[columna][fila].x = bloqueX;
                bloques[columna][fila].y = bloqueY;
                contexto.beginPath();
                contexto.rect(bloqueX, bloqueY, bloqueWidth, bloqueHeight);//DIBUJAMOS UN RECTANGULO POR CADA BLOQUE
                contexto.fillStyle = "#0095DD";
                contexto.fill();
                contexto.closePath();
            }
        }
    }
}
//DETECTAMOS COLISIÓN DE LOS BLOQUES CON LA BOLA
const detectarColision = () =>{
    //RECORREMOS ARRAY DE BLOQUES Y GUARDAMOS UN OBJETO BLOQUE
    for(columna = 0; columna < bloquesColumnas; columna++) {
        for(fila = 0; fila < bloquesFilas; fila++) {
            var objetoBloque = bloques[columna][fila];
            //COMPROBAMOS SI EL STATUS DEL OBJETO BLOQUE ESTÁ A 1
            if (objetoBloque.status == 1) {
                //COMPROBAMOS SI LA BOLA TOCA ALGUN OBJETO BLOQUE, MIRANDO SI SU X ES MAYOR QUE LA X DEL BLOQUE Y MENOR QUE ESA X MAS EL WIDTH DEL BLOQUE, Y MIRANDO SI SU Y ES MAYOR QUE LA Y DEL BLOQUE Y MENOR QUE LA Y DEL BLOQUE MAS SU HEIGHT
                if(x > objetoBloque.x && x < objetoBloque.x + bloqueWidth && y > objetoBloque.y && y < objetoBloque.y+bloqueHeight) {
                    movimientoY = -movimientoY;
                    objetoBloque.status = 0;
                    marcador++;
                    if (marcador == bloquesColumnas * bloquesFilas) {
                        alert("YOU WIN!");
                        document.location.reload();
                    }
                }
            }
            
        }
    }
}
//DIBUJAMOS MARCADOR
function pintarMarcador() {
    contexto.font = "16px Arial";
    contexto.fillStyle = "#0095DD";
    contexto.fillText("Marcador: " + marcador, 8, 20);//SE INDICA EL TEXTO MÁS LAS COORDENADAS X E Y DEL EJE SUPERIOR IZQUIERDA
}
//MOVIMIENTO DE BOLA Y LIMPIEZA DE LIENZO
const juego = () =>{
    //SE BORRA TODO EL CONTENIDO DEL CANVAS DENTRO DE SUS MARGENES. COORDENADAS X E Y DE ESQUINA SUPERIRO IZQUIERDA Y COORDENADAS X E Y DE ESQUINA INFERIOR DERECHA DE UN RECTANGULO
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    //PINTAMOS BLOQUES
    dibujarBloques();
    //PINTAMOS DE NUEVO LA BOLA
    dibujarBola();
    //PINTAMOS STICK
    dibujarStick();
    //PINTAMOS MARCADOR
    pintarMarcador();
    //BUSCAMOS COLISION ENTRE BOLA Y BLOQUES
    detectarColision();
    //INDICAMOS CHOQUE CONTRA PAREDES (ARRIBA Y ABAJO)
    if(y + movimientoY < radioBola) {//SE INCLUYE RADIO BOLA PARA QUE EL REBOTE SE PRODUZCA CUANDO EL BORDE DE LA BOLA TOQUE EL BORDE DE LA PARED, Y NO CUANDO TOQUE EL CENTRO DE LA BOLA
        movimientoY = -movimientoY;
    }else if(y + movimientoY > canvas.height-radioBola){//INDICAMOS QUE PASARÁ SI LA BOLA TOCA EL SUELO
        if(x > stickX && x < stickX + stickWidth){//COMPROBAMOS SI LA BOLA ESTÁ DENTRO DEL STICK
            movimientoY = -movimientoY;
        }
        else{
            document.location.reload();
        }
    }
    //INDICAMOS CHOQUE CONTRA PAREDES (IZQUIERDA Y DERECHAS)
    if(x + movimientoX < radioBola || x + movimientoX > canvas.width-radioBola) {
        movimientoX = -movimientoX;
    }
    //MOVIMIENTO DE LA BOLA
    x += movimientoX;
    y += movimientoY;
    
    // COMPROBAMOS SI LAS TECLAS HAN SIDO PULSADAS Y CONTROLAMOS MOVIMIENTO DEL STICK, ADEMÁS DE CONTROLAR QUE STICK NO ABANDONE EL LIENZO
    if(derechaPulsado && stickX < canvas.width-stickWidth) {
        stickX += 7;
    }
    else if(izquierdaPulsado && stickX > 0) {
        stickX -= 7;
    }
    requestAnimationFrame(juego); //HACEMOS QUE EL NAVEGADOR GESTIONE LA TASA DE REFRESCO DEL JUEGO, Y HACE UN SETINTERVAL A LO QUE DE EL NAVEGADOR
}

//INVOCAMOS AL JUEGO
juego();