const albums = []

let cancion = {
    nombre: '',
    duracion: 0
}

let album = {
    disco: '',
    autor: '',
    codigo: 0,
    canciones: []
}

function getLargestSong(album) {
    const songs = Array.from(album)

    const largestSong = songs.sort((prev, curr) => parseInt(prev.duracion) - parseInt(curr.duracion)).reverse()

    return largestSong[0]
}

function renderAlbums(albums, msg) {
    const container = document.querySelector('.bloque__3')
    container.innerHTML = ''

    if(!albums.length) {
        container.innerHTML = `<p>${msg}</p>`
        return
    }

    let html = ''

    albums.forEach(album => {

        const largestSong = getLargestSong(album.canciones)

        html += `            
            <div class="disco">
                <div class="descripcion__disco">
                    <div class="img__disco">
                        <img src="./imagenes/disco.png" alt="">
                    </div>
                    <div class="descripcion">
                        <p class="nombre__disco">
                            ${album.disco}
                        </p>
                        <span class="banda">
                            ${album.autor}
                        </span>
                        <span class="codigo">
                            Código: ${album.codigo}
                        </span>
                    </div>
                    
                </div>
                <div class="lista__disco">
                    <div class="descripcion__lista">
                        <span class="pista">
                            Pistas
                        </span>
                        <span class="duracion">
                            Duración
                        </span>
                    </div>

                    <div class="detalle__lista">
                        <ul class="lista">
                            ${album.canciones.map(cancion => (
                                `
                                    <li class="item__lista">
                                        <span class="nombre">${cancion.nombre}</span> 
                                        <span class="duracion" style="color: ${cancion.duracion > 180 ? "red" : "inherit"}; font-weight: ${cancion.nombre === largestSong.nombre ? 'bold' : 'normal'}">${cancion.duracion} segs</span>
                                    </li>
                                `
                            )).join('')}
                        </ul>
                    </div>
                </div>
                <div class="cantidad__disco">
                    <span class="cantidad">
                        ${album.canciones.length} ${album.canciones.length === 1 ? 'pista' : 'pistas'}
                    </span>
                    <span class="duracion">
                        ${album.canciones.reduce((prev, curr) => prev + parseInt(curr.duracion), 0)} segs
                    </span>
                    <span class="cancion-mas-larga">
                        La pista con mas duración es: ${largestSong.nombre} con ${largestSong.duracion} segs
                    </span>
                    <span>El promedio total de duracion del disco es de: ${(album.canciones.reduce((prev, curr) => prev + parseInt(curr.duracion), 0) / album.canciones.length).toFixed(2)} segs</span>
                </div>
            </div>
        `
    })

    container.innerHTML = html
}


function handleInput(event) {
    const name = event.target.name
    const value = event.target.value

    if(name === 'nombre') {
        cancion[name] = value
    } else if (name === 'duracion') {
        cancion[name] = parseInt(value) 
    } else {
        album[name] = value
    }
}

function handleSearch(event) {
    if(!albums.length) {
        renderAlbums([], 'Aun no has cargado tus albums! Dale click a "Cargar nuevo disco"')
        return
    }

    if(!event.target.value) {
        renderAlbums(albums, '')
        return
    }

    const filteredSearch = albums.filter(album => parseInt(album.codigo) === parseInt(event.target.value))

    if(!filteredSearch.length) {
        renderAlbums([], 'Tu busqueda no trajo ningun resultado :(')
        return
    }

    renderAlbums(filteredSearch, '')
}

function handleSubmit(event) {
    event.preventDefault()

    if(!album.codigo) {
        alert('CODIGO ES REQUERIDO')
        return
    }

    const codigoExistente = albums.find(elem => elem.codigo === album.codigo)

    if(codigoExistente) {
        alert('CODIGO EXISTENTE, POR FAVOR AGREGA OTRO')
        return
    }

    albums.push(album)

    album = {
        album: '',
        autor: '',
        codigo: 0,
        canciones: []
    }

    cancion = {
        nombre: '',
        duracion: 0
    }
    
    event.target.reset()

    document.querySelector('.add-song').textContent = 'Agregar cancion'
    document.querySelector('.submit-btn').disabled = true
    document.querySelector('.cantidad__discos').textContent = `Agregaste ${albums.length} ${albums.length === 1 ? 'disco' : 'discos'}`
    document.querySelector('.modal').classList.add('d-none')
    document.querySelector('.submit-btn').classList.add('button-disable')

    songList()
    renderAlbums(albums, '')
}

function songList() {
    const listadoAgreagdo = document.querySelector('.lista__agregadas')

    if(album.canciones.length === 0){
        listadoAgreagdo.innerHTML = ""
        return
    }

    listadoAgreagdo.innerHTML += `<li class="item__cancion">${cancion.nombre}</li>` 
}

function addSongsToAlbum() {

    if(cancion.nombre.trim() === '') {
        alert('Nombre cancion es requerido')
        return
    }

    album.canciones.push(cancion)

    songList()

    cancion = {
        nombre: '',
        duracion: 0
    }

    document.querySelector('input#nombre').value = ''
    document.querySelector('input#nombre').required = false
    document.querySelector('input#duracion').value = ''
    document.querySelector('.add-song').textContent = 'Agregar mas canciones'
    document.querySelector('.submit-btn').disabled = false
    document.querySelector('.submit-btn').classList.remove('button-disable')
   
}

function clearWindow() {
    albums.length = 0

    cancion = {
        nombre: '',
        duracion: 0
    }
    
    album = {
        album: '',
        autor: '',
        codigo: 0,
        canciones: []
    }

    renderAlbums(albums, 'Empieza a cargar tus albums! Dale click a "Cargar nuevo disco"')
}

function redireccionHome () {
    window.location="index.html";
}

function mostrarDisco(){
    document.querySelector('.header__home').classList.add('d-none')
    document.querySelector('.box__button').classList.add('d-none')
    document.querySelector('.footer__home').classList.add('d-none')

    document.querySelector('.main__home').classList.add('show__disc')
    document.querySelector('.box__discos').classList.remove('d-none')
    document.querySelector('.boton__inicio').classList.remove('d-none')
}

function ocultarDiscos(){
    document.querySelector('.header__home').classList.remove('d-none')
    document.querySelector('.box__button').classList.remove('d-none')
    document.querySelector('.footer__home').classList.remove('d-none')

    document.querySelector('.main__home').classList.remove('show__disc')
    document.querySelector('.box__discos').classList.add('d-none')
    document.querySelector('.boton__inicio').classList.add('d-none')
}

window.onload = () => {
    renderAlbums(albums, 'Empieza a cargar tus albums! Dale click a "Cargar nuevo disco"')

    const inputs = document.querySelectorAll('.input')
    const form = document.querySelector('.form')
    const submitBtn = document.querySelector('.submit-btn')
    const addSong = document.querySelector('.add-song')
    const discsAdded = document.querySelector('.cantidad__discos')
    const cleanWinddowBtn = document.querySelector('#limpiar-pantalla')
    const loadAlbum = document.querySelector('#cargar-disco')
    const modal = document.querySelector('.modal')
    const closeModal = document.querySelector('.cerrar__modal')
    const library = document.querySelector('.biblioteca')
    const homeBtn = document.querySelector('.boton__inicio')
    const findByIdBtn = document.querySelector('#buscar-disco')
    const searchInput = document.querySelector('#codigo')
  
    if(albums.length === 0) {
        discsAdded.textContent = 'Aun no has ingresado discos! :('
    }

    if(album.canciones.length === 0) {
        submitBtn.disabled = true
    }

    inputs.forEach(element => {
        element.addEventListener('input', handleInput)
    })
    searchInput.addEventListener('input', handleSearch)

    loadAlbum.addEventListener('click', () => modal.classList.remove('d-none'))
    closeModal.addEventListener('click', () => modal.classList.add('d-none'))

    library.addEventListener('click', mostrarDisco)
    homeBtn.addEventListener('click', ocultarDiscos)

    cleanWinddowBtn.addEventListener('click', clearWindow)
    addSong.addEventListener('click', addSongsToAlbum)
    findByIdBtn.addEventListener('click', () => document.querySelector('.buscador').classList.toggle('d-none'))

    form.addEventListener('submit', handleSubmit)
}


