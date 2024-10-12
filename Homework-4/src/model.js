import * as $ from "jquery";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getFirestore,collection,getDoc,addDoc, getDocs, onSnapshot, setDoc, query, where } from "firebase/firestore";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const albums = collection(db, "albums");
export function addAlbum(album) {
  try {
    addDoc(collection(db, "albums"), album);
    alert("Album Added");
  }
  catch (error) {
    console.log(error);
  }
  
}

export async function getGenre(genre) {
  if (genre !== "--") {
    const q = query(albums, where("genre", "==", genre));
    const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  showGenres(doc.data())
});
  }
}
export function showGenres (data)  {
  console.log(data);
 
  $(".albumTable").append(`<tr class="albumRow">
    <td>${data.name}</td>
    <td><img src="${data.cover}" width=200 height=200></td>
    <td>${data.artist}</td>
    <td>${data.releaseDate}</td>
    <td>${data.genre}</td>
  </tr>`);
}

export async function showAllGenres() {
  $(".albumTable").html(` <tr>
      <th>Album Name</th>
      <th>Cover</th>
      <th>Artist</th>
      <th>Release Date</th>
      <th>Genre</th>
    </tr>`);
  const q = query(albums, where("genre", "!=", "--"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    showGenres(doc.data())
  });
}

onSnapshot(collection(db, "albums"), (snapshot) => {
    let albums = "";
    snapshot.forEach((doc) => {
      albums += '<tr class="albumRow">'
      albums += `<td>${doc.data().name}</td>`
      albums += `<td><img src="${doc.data().cover}" width=200 height=200></td>`
      albums += `<td>${doc.data().artist}</td>`
      albums += `<td>${doc.data().releaseDate}</td>`
      albums += `<td>${doc.data().genre}</td>`
    });
    albums += '</tr>'
    $(".albumTable").append(albums);
  });


