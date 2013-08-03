var request = superagent

document.addEventListener("readystatechange", function(e) {
  if(document.readyState != "complete")
    return

  var dropZone = document.getElementById("drop-zone")

  function toggleDragHover(hovering) {

    if(hovering) {
      dropZone.classList.add("drag-hover");
    } else {
      dropZone.classList.remove("drag-hover");
    }

  }

  /* Default behavior for drag/drop events */
  function catchEvent(e) {
    /* Don't bubble */
    e.stopPropagation();

    /* Usually a redirect - prevent it */
    e.preventDefault();
  }

  /* Functions to call on drop events */
  function dragEnter(e) {
    catchEvent(e)
    toggleDragHover(true)
    return false
  }

  function dragLeave(e) {
    catchEvent(e)
    toggleDragHover(false)
    return false
  }

  function dragEnd(e) {
    catchEvent(e)
    toggleDragHover(false)
    return false
  }

  function dragOver(e) {
    catchEvent(e)
    return false
  }

  function drop(e) {
    catchEvent(e)
    toggleDragHover(false)

    // Offload work
    uploadFile(e)

    return false
  }

  function uploadFile(e) {
    var filename = e.dataTransfer.files[0].name

    formData = new FormData()
    formData.append(filename, e.dataTransfer.files[0], filename)

    // POST to /upload
    request
      .post('/upload')
      .send(formData)
      .end(function(err, res) {
        if(err)
          console.log(err)

        console.log(res)
      })

   }

  // fired when item enters drop area 
  dropZone.addEventListener("dragenter", dragEnter)
  // fired when item leaves drop area
  dropZone.addEventListener("dragleave", dragLeave)
  // fired while item moves over drop area
  dropZone.addEventListener("dragover", dragOver)
  // fired when item is released
  dropZone.addEventListener("dragend", dragEnd)
  // fired when item is released
  dropZone.addEventListener("drop",  drop)

})