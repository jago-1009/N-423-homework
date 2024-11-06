<script>
import Navbar from '../components/Navbar.svelte';
import {getAuth,onAuthStateChanged} from 'firebase/auth'
import {getContext, onMount, setContext, tick} from 'svelte';
import Card from '../components/Card.svelte';
import Logo from '../assets/img/logo.png'
import {getFirestore, doc, getDoc, setDoc, onSnapshot, collection, getDocs, query, limit } from 'firebase/firestore'
import { app } from '../app/firebaseConfig';
let user = getContext('user');
let admin;
let db = getFirestore(app);
let dataHeaders = ['weapons', 'gear', 'misc']
let data = [];

async function getAllItems(item) {
    const itemsRef = collection(db, item);
    const itemsQuery = query(itemsRef, limit(10));  
    const itemsSnapshot = await getDocs(itemsQuery);
    if (!itemsSnapshot.empty) {
    const itemsArray = itemsSnapshot.docs.map(doc => ({
        
        ...doc.data(),
    }))
    return itemsArray

}
}


onMount(() => {
    dataHeaders.forEach(item => {
        
        getAllItems(item)
    .then(items => {
        if (items) {

        // console.log("Items array:", items);
        data = [...data, {
            "key":item,
            "data":[...data, ...items]}]
        console.log("Data array:", data);
        }
    })
    .catch(error => {
        console.error("Error fetching items:", error);
    });
    });
   
})

</script>
<div id="app">

<h1 class="welcome">Welcome {user.userName}!</h1>
<div class="items">
<p>Items available for order:</p>
<div class="cards">
    {#each data as items}
    {#each items.data as item}
<Card imageSrc= {item.imageUrl || "https://static.thenounproject.com/png/115013-200.png"} imageAlt="{item.name}" imageName={item.name} imageTypes={item.types} imagePrice="${item.price}" imageCollection={items.key}/>
{/each}
{/each}
</div>
</div>
</div>

<style>
    #app {
        font-family: 'Cardo';
        height:10vh;
        display: flex;
        background-color: var(--background);
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
        height: 100vh;
    }
    .items {
        color: var(--text-color);
        background-color: var(--background);
        display: block;

        height:100vh;
        margin-left:20px;
        font-size: 16px;
    }
    .welcome {
        color: var(--text-color);
        text-align: center;
    }
    .cards {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
        margin:20px;
    }
</style>