
var paginaInicio = 1; /* Página de inicio para visualizar el PDF */
var escalaCanvas = 1; /* Tamaño de escala en canvas */
var archivoPDF; /* Variable donde guardamos el archivo PDF temporal */

var zoomIn = document.getElementById("btnZoomIn");
var zoomOut = document.getElementById("btnZoomOut");

$(document).ready(function () {
    $("#file-es").change(cambioArchivo);
    PDFJS.workerSrc = "/Scripts/core/pdf/pdf.worker.js";
});

function cambioArchivo() {
    if ($("#file-es").get(0).files.length > 0) {
        archivoPDF = $(this).get(0).files[0];
        if (archivoPDF.type === "application/pdf") {
            renderViewer(URL.createObjectURL(archivoPDF));
        } else {

        }
    }
}

function displayPage(pdf, numPage) {
    pdf.getPage(numPage).then(function (page) {
        pageRender(page);
    });
}

function pageNext() {
    if (paginaInicio >= archivoPDF.numPages) {
        return;
    }

    paginaInicio++;
    displayPage(archivoPDF, paginaInicio);
}

function pegeBack() {
    if (paginaInicio <= 1) {
        return;
    }

    paginaInicio--;
    displayPage(archivoPDF, paginaInicio);
}

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

function renderViewer(file) {
    PDFJS.getDocument({ url: file }).then(function (pdf) {
        displayPage(pdf, 1);
        archivoPDF = pdf;
    }).then(function (error) {

    });
}

function zoomInr() {
    if (escalaCanvas === 5) {
        zoomIn.setAttribute("disabled", true);
        return;
    }
   
    escalaCanvas = escalaCanvas + 0.25;
    displayPage(archivoPDF, paginaInicio);
}

function zoomOutr() {
    if (escalaCanvas <= 1) {
        zoomOut.setAttribute("disabled", true);
        return;
    }
    escalaCanvas = escalaCanvas - 0.25;
    displayPage(archivoPDF, paginaInicio);
}