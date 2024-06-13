// if(window.location.pathname == "/"){
//     $ondelete = $(".table tbody td a.delete");
//     $ondelete.click(function(){
//         var id = $(this).attr("data-id")

//         var request = {
//             "url":  `http://localhost:3000/api/users/${id}`,
//             "method": 'DELETE'
//         }
//         if (confirm("Do you really want to delete this record")){
//             $.ajax(request).done(function(response){
//                 alert("Data Deleted Successfully");
//                 location.reload()
//             })
//         }
//     })
// }



$(document).ready(function() {
    $(".table tbody").on("click", "button.delete", function() {
      var userId = $(this).data("id");
      
      if (confirm("Are you sure you want to delete this user?")) {
        $.ajax({
          url: `/api/users/${userId}`,
          method: "DELETE",
          success: function(response) {
            alert("User deleted successfully");
            window.location.reload(); // Reload the page after deletion
          },
          error: function(xhr, textStatus, errorThrown) {
            alert("Error deleting user: " + errorThrown);
          }
        });
      }
    });
  });
  