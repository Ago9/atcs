var simulationButton = document.getElementById("simulationButton");
var generalStatsButton = document.getElementById("statsButton");

simulationButton.addEventListener("click", toVisitorsPage);
generalStatsButton.addEventListener("click", toStatsPage);

function toVisitorsPage() {
    document.location.href='/visitatore';
}

function toStatsPage() {
    document.location.href='/';
}