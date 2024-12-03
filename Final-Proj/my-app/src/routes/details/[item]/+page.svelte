<script>
	import { updateCurrentUser } from 'firebase/auth';
    import {app} from '../../../app/firebaseConfig.js'
    import {getFirestore, doc, getDoc, setDoc, onSnapshot, collection, getDocs, query, limit, where, updateDoc, arrayUnion } from 'firebase/firestore'
    import {getContext, onMount, setContext, tick} from 'svelte';
    let {data} = $props();
    function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
    console.log(data)
    const db = getFirestore(app)
    const user = getContext('user');
    onMount(async () => {
        const itemsRef = collection(db, data.key);
        const itemsQuery = query(itemsRef, where("name", "==", data.name));  
        const itemsSnapshot = await getDocs(itemsQuery);
        if (!itemsSnapshot.empty) {
        const itemsArray = itemsSnapshot.docs.map(doc => ({
            
            ...doc.data(),
        }))
        data = itemsArray[0]
        console.log(data)
        }
    })
    async function addToCart() {
        if (user.isSignedIn) {
            setDoc(doc(db, "carts", user.userData.uid), {}, {merge: true});
            const cartRef = doc(db, "carts", user.userData.uid);
            
           
            await updateDoc(cartRef, {
                cart: arrayUnion(data)
            })
        }
       
    }
    </script>

<main class="details">
    <div class="card">
<h1>{data.name}</h1>
<img class="image" src={data.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhRzDiQGWWvwwyr_M9KCZlLE3SNZ7b33rr-Q&s"} alt={data.name}>
<p><a class="link" href="{data.url}">{data.url}</a></p>
<p>{data.desc}</p>
<h2>Manufacturer: {data.manufacturer}</h2>
<h2>Sold By: {data.distributor}</h2>
{#if user && user.isSignedIn}
<button class="addBtn" on:click={addToCart}><span>Add to Group Order</span></button>
{/if}
{#if user.isAdmin}
<button class="editBtn"><a href='/edit/{data.name}?key={data.type}'><span>Edit Entry</span></a></button>

{/if}
</div>

</main>

<style>
    .link {
        text-decoration: none;
        color: var(--main-color);
    }
    .addBtn, .editBtn {
        position: relative;
        background-color: var(--main-color);
        width:30%;
        height:40px;
        color:var(--background);
        font-size: 100%;
        border-radius: 10px;
        border:none;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }
    .addBtn:after {
  content: '+';
  position: absolute;
  opacity: 0;  
  right: -20px;
  top:15%;
  transition: 0.5s;
  font-size: 24px;
}
.editBtn:after {
    content: '✎';
  position: absolute;
  opacity: 0;  
  right: -20px;
  top:13%;
  transition: 0.5s;
  font-size: 24px;
}
.addBtn:hover, .editBtn:hover{
  padding-right: 24px;
  padding-left:8px;
}

.addBtn:hover:after, .editBtn:hover:after {
  opacity: 1;
  right: 10px;
}
    .card {
        width:50%;
        text-align: center;
        margin:20px;
    }
    .details {
        height:100%;
        background-color: var(--background);
        color:var(--text-color);
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
    }
    .image {
        width: 100%;
        aspect-ratio: 3/2;
        border: 3px solid var(--main-color);
        border-radius: 10px;
    }
    p {
        font-size:100%;
    }
    @media only screen and (max-width: 600px) {
        .card {
            width: 75%;
        }
    }
</style>