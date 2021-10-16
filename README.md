# Tutorial Videojuego 2D en canvas
## Tutorial en https://developer.mozilla.org/es/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
## Pasos a seguir en la creación del juego
* Creo archivos HTML, CSS Y JS.
* Creo elemento canvas en archivo HTML.
* Referenciamos canvas en JS y creo contexto.
* Creo función para pintar bola en el lienzo.
* Creo variables para controlar movimiento de la bola.
* Creo funciones para controlar el rebote de la bola.
* Creo stick.
* Creo funciones para el movimiento del stick y para controlarlo a través de las teclas "Izquierda" y "Derecha".
* Genero un gameover al tocar la bola el fondo de la pantalla del juego.
* Creo función para hacer que si la bola toca el stick, no sea gameover.
* Creo variables para la creación de los bloques.
* Creo un array de arrays, en donde guardaré un objeto por ladrillo creado.
* Creo función para pintar cada ladrillo en canvas.
* Creo función para comprobar la posición de cada objeto ladrillo, y controlar si la bola toca algún ladrillo.
* Hago que cada objeto ladrillo tenga otra propiedad (status) que será siempre 1 a no ser que la bola toque el ladrillo, lo que hará que sea 0.
* Solo se pintarán los bloques que tengan status 1.
* Genero un marcador, que aumentará cuando se toque algún ladrillo.
* Cuando todos los bloques son destruidos, el juego acaba.