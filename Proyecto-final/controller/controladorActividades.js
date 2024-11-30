// Base URL for backend API
const BASE_URL = 'http://localhost:3000/api/actividades';

/** Toggle the dropdown menu */
function toggleMenu(event) {
    event.stopPropagation(); // Prevent click propagation
    const activityBox = event.target.closest('.activity-box');
    const dropdownMenu = activityBox.querySelector('.dropdown-menu');

    if (dropdownMenu) {
        dropdownMenu.classList.toggle('show-menu');
    }
}

/** Edit an activity (Navigate to edit page) */
function editActivity(id) {
    window.location.href = `crearActividad.html?id=${id}`; // Redirige a la página de edición con el ID
}

/** Delete an activity */
async function deleteActivity(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Actividad eliminada correctamente');
                getActividades(); // Recargar la lista de actividades
            } else {
                console.error('Error al eliminar la actividad:', await response.json());
            }
        } catch (error) {
            console.error('Error al eliminar la actividad:', error);
        }
    }
}


async function getActividades() {
    try {
        const response = await fetch(BASE_URL);
        console.log('Respuesta del servidor:', response);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const actividades = await response.json();
        renderActividades(actividades);
    } catch (error) {
        console.error('Error fetching activities:', error);
    }
}


/** Create a new activity */
async function createActividad(actividad) {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(actividad)
        });
        const nuevaActividad = await response.json();
        console.log('Activity created:', nuevaActividad);
        window.location.href = 'actividades.html';
    } catch (error) {
        console.error('Error creating activity:', error);
    }
}

/** Add a new section dynamically */
function anadirSeccion() {
    const form = document.querySelector('form');
    const sectionIndex = form.querySelectorAll('input[name^="texto_seccion"]').length + 1;

    const labelTitulo = createLabel(`Sección ${sectionIndex}:`, `titulo_seccion${sectionIndex}`);
    const inputTitulo = createInput(`titulo_seccion${sectionIndex}`, 'Ingrese el título de la sección');
    const inputTexto = createInput(`texto_seccion${sectionIndex}`, 'Ingrese el texto de la sección');

    form.append(labelTitulo, inputTitulo, inputTexto);
}

/** Add a new question dynamically */
function anadirPregunta() {
    const form = document.querySelector('form');
    const questionIndex = form.querySelectorAll('.options').length + 1;

    const labelPregunta = createLabel(`Pregunta ${questionIndex}:`, `pregunta${questionIndex}`);
    const inputPregunta = createInput(`pregunta${questionIndex}`, 'Ingrese el enunciado de la pregunta');

    const divOpciones = createOptionContainer(questionIndex);
    form.append(labelPregunta, inputPregunta, divOpciones);
}

/** Submit the created activity */
function publicarActividad() {
    const form = document.querySelector('form');
    const titulo = form.querySelector('#titulo').value;

    const secciones = Array.from(form.querySelectorAll('[name^="titulo_seccion"]')).map((input, index) => ({
        titulo: input.value,
        texto: form.querySelector(`[name="texto_seccion${index + 1}"]`).value
    }));

    const preguntas = Array.from(form.querySelectorAll('[name^="pregunta"]')).map((input, index) => ({
        enunciado: input.value,
        opciones: Array.from(document.querySelectorAll(`.options input[name="opcion${index + 1}"]`))
            .map(opcion => opcion.value)
    }));

    const actividad = { titulo, secciones, preguntas };

    createActividad(actividad);
}

/** Utility to create labels */
function createLabel(text, forAttr) {
    const label = document.createElement('label');
    label.textContent = text;
    label.htmlFor = forAttr;
    return label;
}

/** Utility to create input fields */
function createInput(name, placeholder) {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = name;
    input.placeholder = placeholder;
    return input;
}

/** Utility to create option containers */
function createOptionContainer(questionIndex) {
    const div = document.createElement('div');
    div.classList.add('options');

    const inputRadio = document.createElement('input');
    inputRadio.type = 'radio';
    inputRadio.name = `respuesta${questionIndex}`;
    inputRadio.value = '1';

    const labelOpcion = createLabel('Opción A:', `respuesta${questionIndex}`);
    const inputOpcion = createInput(`opcion${questionIndex}`, 'Ingrese la opción de respuesta');

    div.append(inputRadio, labelOpcion, inputOpcion);
    return div;
}

function renderActividades(actividades) {
    const container = document.querySelector('.activities-container');
    container.innerHTML = ''; // Limpia el contenedor antes de renderizar

    actividades.forEach(({ _id, titulo }) => {
        const activityBox = document.createElement('div');
        activityBox.classList.add('activity-box');
        activityBox.innerHTML = `
            <p>${titulo}</p>
            <img class="image-top" src="../../assets/img/puntos.png" alt="Options" onclick="toggleMenu(event)">
            <img class="image-bottom" src="../../assets/img/punta.png" alt="Play" onclick="window.location.href='IntroActividades.html?id=${_id}'">
            <div class="dropdown-menu">
                <button onclick="editActivity('${_id}')">Editar</button>
                <button onclick="deleteActivity('${_id}')">Eliminar</button>
            </div>
        `;
        container.appendChild(activityBox);
    });
}

async function actualizarActividad(id, actividad) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(actividad)
        });

        if (response.ok) {
            alert('Actividad actualizada correctamente');
            window.location.href = 'actividades.html'; // Redirige a la lista de actividades
        } else {
            console.error('Error al actualizar la actividad:', await response.json());
        }
    } catch (error) {
        console.error('Error al actualizar la actividad:', error);
    }
}

export {
    createActividad,
    toggleMenu,
    editActivity,
    deleteActivity,
    getActividades,
    anadirSeccion,
    anadirPregunta,
    publicarActividad,
    createLabel,
    createInput,
    createOptionContainer,
    renderActividades,
    actualizarActividad
};
