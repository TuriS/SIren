function start(id) {
    console.log("Start");
    $.post("/player/start/" + id,"start", function(res) {});
}
function stop(id) {
    $.post("/player/stop/" + id,"start", function(res) {});
}
function vol(id, value) {
    $.post("/player/setVolume/" + id + "/" + value,"start", function(res) {});
}