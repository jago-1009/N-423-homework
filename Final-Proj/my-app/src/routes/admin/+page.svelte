<script>
    import {getContext, onMount} from 'svelte';
    import {getAuth,onAuthStateChanged} from 'firebase/auth'
    import Card from '../../components/Card.svelte';
    import {getFirestore, doc, getDoc, setDoc, onSnapshot, collection, getDocs, query, limit, updateDoc, deleteDoc } from 'firebase/firestore'
    import { app } from '../../app/firebaseConfig';
	import { passive } from 'svelte/legacy';
    let user = getContext('user');
    let admin;
    let db = getFirestore(app);
    let dataHeaders = ['Socal Swords', 'Blackfencer']
    let data = $state([]);
    let Socal = [];
    let Blackfencer = [];
    async function getAllItems(header) {
        const itemsRef = collection(db, 'orders');
        const itemsDoc = doc(itemsRef, header);
        const dataRef = collection(itemsDoc, 'items');
        
        const dataDoc = doc(dataRef, 'data'); 
        const dataSnap = await getDoc(dataDoc);
        const dataObj = dataSnap.data();
        console.log(dataObj)
for (const [key, value] of Object.entries(dataObj)) {
   if (key == "totalCount") {
       continue;}
   else {
       value.forEach(element => {
           data.push(element)
       });
   }

}
        const dataArr = dataObj.key
        if (dataArr != undefined) {
        dataArr.forEach(element => {
            console.log(element)
            data.push(element)
        });
        }
        else {
            return false;
        }
    }
    function clearData() {
       
        dataHeaders.forEach(async header => {
            const itemsRef = collection(db, 'orders');
            const itemsDoc = doc(itemsRef, header);
            const dataRef = collection(itemsDoc, 'items');
            const dataDoc = doc(dataRef, 'data'); 
            const dataSnap = await getDoc(dataDoc);
            const totalObj = dataSnap.data()
            for (const [key, value] of Object.entries(totalObj)) {
                if (value != "totalCount") {
                    await updateDoc(dataDoc, {
                        [key]: []
                    })
                }
            
            }
            updateDoc(dataDoc, {
                totalCount:0
            })
            data = []
        });
    }
    onMount(() => {
        dataHeaders.forEach(header => {
            getAllItems(header)
        })
       
    })
</script>

<h1>Group Orders</h1>
<div class="orders">
{#each data as item }
    <Card imageSrc={item.imageUrl || "https://static.thenounproject.com/png/115013-200.png"} imageAlt={item.name} imageName={item.name} imageTypes={item.types} imagePrice={item.price} imageCollection={item.type} />
{/each}
</div>
<div class="clear-btn"><button onclick={clearData}>Clear Items</button></div>
<style>
    h1 {
        color: var(--text-color);
    }
    .orders {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }
    .clear-btn {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-top:50px;
    }
    .clear-btn button {
        width:40%;
        height:50px;
        border: 2px solid var(--main-color);
        border-radius: 20px;
        color: var(--main-color);
        background-color: transparent;
        cursor: pointer;
        transition: 0.3s all;
    }
    .clear-btn button:hover {
        background-color: var(--main-color);
        color: var(--background);
    }
</style>