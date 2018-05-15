
var paginaInicio = 1; /* Página de inicio para visualizar el PDF */
var escalaCanvas = 1; /* Tamaño de escala en canvas */
var archivoPDF; /* Variable donde guardamos el archivo PDF temporal */

$(document).ready(function () {
    PDFJS.workerSrc = "/Scripts/core/pdef.js/pdf.worker.js";
});

function pageRender(page) {
    var scale = escalaCanvas;
    var viewport = page.getViewport(scale);
    var canvas = document.getElementById("the-canvas");
    var context = canvas.getContext("2d");

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    var renderContext = {
        canvasContext: context,
        viewport: viewport
    };

    page.render(renderContext);
}

function displayPage(pdf, numPage) {
    pdf.getPage(numPage).then(function (page) {
        pageRender(page);
    });
}

function rederViewer(file) {
    PDFJS.getDocument({
        url: file
    }).then(function (pdf) {
        displayPage(pdf);
        archivoPDF = pdf;
        }).then(null, function (error) {
            /* Alerta por error de lectura */
            console.log(error);
        });
}

