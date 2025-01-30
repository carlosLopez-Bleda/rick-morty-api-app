$(document).ready(function () {
    function getRandomId() {
        return Math.floor(Math.random() * 826) + 1; // 826 personajes en la API
    }

    function displayCharacter(data) {
        $("#characterContainer").append(`
            <div class="character-card">
                <h2>${data.name}</h2>
                <img src="${data.image}" alt="${data.name}">
                <p><strong>Especie:</strong> ${data.species}</p>
                <p><strong>Estado:</strong> ${data.status}</p>
            </div>
        `);
    }

    // Obtener un personaje aleatorio
    $("#fetchCharacter").click(function () {
        $("#characterContainer").html(""); // Limpiar antes de mostrar el nuevo
        let apiUrl = `https://rickandmortyapi.com/api/character/${getRandomId()}`;

        $.ajax({
            url: apiUrl,
            method: "GET",
            success: function (data) {
                displayCharacter(data);
            },
            error: function () {
                $("#characterContainer").html(`<p style="color: red;">Error al obtener el personaje. Intenta de nuevo.</p>`);
            }
        });
    });

    // Buscar personaje por nombre
    $("#searchButton").click(function () {
        let searchQuery = $("#searchInput").val().trim();
        if (searchQuery === "") {
            alert("Por favor, ingresa un nombre.");
            return;
        }

        let apiUrl = `https://rickandmortyapi.com/api/character/?name=${searchQuery}`;

        $.ajax({
            url: apiUrl,
            method: "GET",
            success: function (response) {
                $("#characterContainer").html(""); // Limpiar resultados anteriores
                if (response.results.length > 0) {
                    response.results.slice(0, 3).forEach(displayCharacter); // Mostrar hasta 3 resultados
                } else {
                    $("#characterContainer").html(`<p style="color: red;">No se encontraron personajes con ese nombre.</p>`);
                }
            },
            error: function () {
                $("#characterContainer").html(`<p style="color: red;">Error al buscar. Intenta de nuevo.</p>`);
            }
        });
    });

    // Obtener 3 personajes aleatorios
    $("#fetchMultiple").click(function () {
        $("#characterContainer").html(""); // Limpiar antes de mostrar los nuevos
        let ids = [getRandomId(), getRandomId(), getRandomId()];
        let apiUrl = `https://rickandmortyapi.com/api/character/${ids.join(",")}`;

        $.ajax({
            url: apiUrl,
            method: "GET",
            success: function (data) {
                if (Array.isArray(data)) {
                    data.forEach(displayCharacter);
                } else {
                    displayCharacter(data);
                }
            },
            error: function () {
                $("#characterContainer").html(`<p style="color: red;">Error al obtener los personajes. Intenta de nuevo.</p>`);
            }
        });
    });
});
