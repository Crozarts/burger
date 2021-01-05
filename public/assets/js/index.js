// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $.ajax("/burgers", {
    type: "GET"
  }).then(function(data) {
    var burgersOrdered = $("#burgersOrdered");
    var burgersDevoured = $("#burgersDevoured");

    var burgers = data.burgers;
    var len = burgers.length;

    for (var i = 0; i < len; i++) {
      var new_elem =
        "<li>" +
        burgers[i].id + 
        ". "+burgers[i].name +    
          "      <button class='change-devour' data-id='" +
        burgers[i].id +
        "' data-newdevour='" +
        !burgers[i].devoured +
        "'>";

      if (burgers[i].devoured) {
        new_elem += "Eat this burger";
      } else {
        new_elem += "has not been eaten";
      }

      new_elem += "</button>";

      new_elem +=
        "<button class='delete-burger' data-id='" +
        burgers[i].id +
        "'>Throw away burger</button></li>";

      if (burgers[i].devoured) {
        burgersOrdered.append(new_elem);
      } else {
        burgersDevoured.append(new_elem);
      }
    }
  });

  $(document).on("click", ".change-devour", function(event) {
    var id = $(this).data("id");
    var newDevour = $(this).data("newdevour")===true;

    var newDevouredState = {
      devoured: newDevour
    };

    // Send the PUT request.
    $.ajax("/burgers/" + id, {
      type: "PUT",
      data: JSON.stringify(newDevouredState),
      dataType:'json',
      contentType: 'application/json'
    }).then(function() {
      location.reload();
    });
  });

  $(".create-form").on("submit", function(event) {
    event.preventDefault();

    var newBurger = {
      name: $("#ca")
        .val()
        .trim(),
      devoured: $("[name=devoured]:checked")
        .val()
        .trim()
    };

    // Send the POST request.
    $.ajax("/burgers", {
      type: "POST",
      data: JSON.stringify(newBurger),
      dataType:'json',
      contentType: 'application/json'
    }).then(function() {
      location.reload();
    });
  });

  $(document).on("click", ".delete-burger", function(event) {
    var id = $(this).data("id");

    // delete request
    $.ajax("/burgers/" + id, {
      type: "DELETE"
    }).then(function() {
      location.reload();
    });
  });
});
