var defaultValue =  {
    "a": {
        type: "music",
        path: "/home/turi/Musik/ambient_travel_lizenzfrei_privat_evermusic.mp3"
    }
};

function start(id) {
    console.log("Start");
    let vol = $("#soundfile_" + id + " input[type=range]").val();
    let settings = {
        volume: vol
    };
    $.post("/player/start/" + id, settings, function(res) {});
}

function stop(id) {
    $.post("/player/stop/" + id,"start", function(res) {});
}

function vol(id, value) {
    $.post("/player/setVolume/" + id + "/" + value,"start", function(res) {});
}

var el;

function start_stop(element, id) {
    if(element.classList.contains("playing")) {
        $.post("/player/stop/" + id,"start", function(res) {}).then(()=> {
            element.classList.remove("playing");
            element.classList.remove("btn-primary");
            element.classList.add("btn-secondary");
        });
    } else {
        let vol = $("#soundfile_" + id + " input[type=range]").val();
        let settings = {
            volume: vol
        };
        $.post("/player/start/" + id, settings, function(res) {}).then(()=> {
            element.classList.add("playing");
            element.classList.add("btn-primary");
            element.classList.remove("btn-secondary");
        });


    }
}