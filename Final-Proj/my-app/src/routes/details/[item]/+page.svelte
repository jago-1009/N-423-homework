<script>
    import {app} from '../../../app/firebaseConfig.js'
    import {getFirestore, doc, getDoc, setDoc, onSnapshot, collection, getDocs, query, limit, where } from 'firebase/firestore'
    import {getContext, onMount, setContext, tick} from 'svelte';
    let {data} = $props();
    console.log(data)
    const db = getFirestore(app)

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
    </script>

<main class="details">
<h1>{data.name}</h1>
<h1>By: {data.manufacturer}</h1>

</main>

<style>
    .details {
        height:100vh;
        background-color: var(--background);
        color:var(--text-color);
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
    }
</style>