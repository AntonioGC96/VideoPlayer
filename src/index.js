const fadeTime = 1000;
var files = $("#folderPicker")[0].files;
var i = 0;

$(document).on("change", (event) => {
  files = event.target.files;
  for (const file of files) {
    console.log(file.webkitRelativePath); // path inside the folder
  }
  $("input").remove();
  $("p").remove();
  $("ul").remove();
});

$(document).on("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "f") {
    $("#media").fadeOut(fadeTime)
    let relativePath, type;
    [relativePath, type] = newFilePathAndType("forward");
    setTimeout(loadNewMedia, fadeTime, relativePath, type);
  }
  else if (e.key === "ArrowLeft" || e.key === "b") {
    $("#media").fadeOut(fadeTime)
    let relativePath, type;
    [relativePath, type] = newFilePathAndType("backward");
    setTimeout(loadNewMedia, fadeTime, relativePath, type);
  } else if (e.key === " ") {
    videos = $("video");
    if ($("video").length !== 0) {
      video = $("video")[0]
      video.paused ? video.play() : video.pause();
    }
  }
})

function loadNewMedia(relativePath, type) {
  $("#media").remove()
  if (type.startsWith("video")) {
    $("#container").prepend(`<video id="media" loop="true" autoplay muted><source id="source" src=""/></video>`)
    $("#media")[0].muted = false
    $("#media").attr("src", "./" + relativePath)
    $("#media")[0].load();
    $("#media").fadeIn(fadeTime)
  }
  if (type.startsWith("image")) {
    $("#media").remove()
    $("#container").prepend(`<img id="media" src="" alt="media">`)
    $("#media").attr("src", "./" + relativePath)
    $("#media").fadeIn(fadeTime)
  }
}

function newFilePathAndType(mode) {
  var webkitRelativePath, type = "";
  if (files.length !== 0) {
    if (mode === "forward") {
      // Increment i by 1
      i++;
      if (i > files.length) {
        // If end of file list has been surpassed, reset to 1
        i = 1
      }
    } else if (mode === "backward") {
      // Reduce i by 1
      i--;
      if (i < 1) {
        // If beginning of file list has been surpassed, reset to the end of list
        i = files.length
      }
    } else {
      console.log("Mode not recognised: " + mode)
    }
    [webkitRelativePath, type] = [files[i-1].webkitRelativePath, files[i-1].type]
  }
  console.log(mode, i, webkitRelativePath, type)
  return [webkitRelativePath, type]
}
