var defaultValue =  {
    "a": {
        type: "music",
        path: "/home/turi/Musik/ambient_travel_lizenzfrei_privat_evermusic.mp3"
    }
};

function start(id) {
    console.log("Start");
    let vol = $("#" + id + " input[type=range]").val();
    defaultValue[id].volume = vol;
    console.log(vol);
    $.post("/player/start/" + id, defaultValue[id], function(res) {});
}
function stop(id) {
    $.post("/player/stop/" + id,"start", function(res) {});
}
function vol(id, value) {
    $.post("/player/setVolume/" + id + "/" + value,"start", function(res) {});
}