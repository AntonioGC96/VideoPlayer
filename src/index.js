var files = $("#folderPicker")[0].files;
var i = 0;

$(document).on("change", (event) => {
  files = event.target.files;
  for (const file of files) {
    console.log(file.webkitRelativePath); // path inside the folder
  }
  $("input").remove();
  $("p").remove();
  $("#container").prepend(`<video id="video" loop="true" autoplay muted><source id="source" src=""/></video>`)
  $("#video")[0].muted = false
});

$(document).on("keydown", (e) => {
  if (e.key === "ArrowRight") {
    $("#video").fadeOut(1000)
    let name, type;
    [name, type] = nextFileNameAndType();
    setTimeout(() => {
      if (type.startsWith("video")) {
        $("#video").attr("src", "./sources/" + name)
        $("#video").attr("autoplay", "true")
        video.load();
        $("#video").fadeIn(1000)
      }
      if (type.startsWith("image")) {
        $("#video").attr("poster", "./sources/" + name)
        $("#video").removeAttr("autoplay")
        video.load();
        $("#video").fadeIn(1000)
      }
    }, 1000)
  }
})

function nextFileNameAndType() {
  var name, type = "";
  if (files.length !== 0) {
    if (i >= files.length) {
      i = 0
    }
    [name, type] = [files[i].name, files[i].type]
    i++;
  }
  console.log(name, type)
  return [name, type]
}
