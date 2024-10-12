import * as $ from "jquery";
import { addAlbum, getGenre, showAllGenres } from "./model";


function initListeners() {

 
  $("#addBtn").on("click", (e) => {
    e.preventDefault();
    let name = $("#aName").val();
    let img = $("#aCover").val();
    let artist = $("#aArtist").val();
    let releaseDate = $("#aDate").val();
    let genre = $("#aGenre").val();
    if (name === "" || img === "" || artist === "" || releaseDate === "" || genre === "") {
      alert("Please fill in all fields");
    }
    else {
    let album = {
      name: name,
      cover: img,
      artist: artist,
      releaseDate: releaseDate,
      genre:genre
    }
    addAlbum(album)
  }
  });
  $("#genre").on("change", (e) => {
    e.preventDefault();
    let genre = $("#genre").val();
    getGenre(genre);
    if (genre !== "--") {
      $(".albumTable").html(`<tr>
      <th>Album Name</th>
      <th>Cover</th>
      <th>Artist</th>
      <th>Release Date</th>
      <th>Genre</th>
    </tr>
   `);
    }
    else {
      showAllGenres();
    }
  })
}


$(document).ready(function () {
  initListeners();
});