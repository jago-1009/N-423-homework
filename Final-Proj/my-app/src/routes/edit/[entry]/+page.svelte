<script>
 import {app} from '../../../app/firebaseConfig.js'
    import {getFirestore, doc, getDoc, setDoc, onSnapshot, collection, getDocs, query, limit, where, updateDoc, arrayUnion } from 'firebase/firestore'
    import {getContext, onMount, setContext, tick} from 'svelte';
    let {data} = $props();
    const db = getFirestore(app)
    const user = getContext('user');
    let oldName = $state('')
    let name = $state('')
    let desc = $state('')
    let imageUrl = $state('')
    let manufacturer = $state('')
    let distributor = $state('')
    let price = $state('')
    let type= $state('')
    let url = $state('');
    onMount(async () => {
        const itemsRef = collection(db, data.key);
        const itemsQuery = query(itemsRef, where("name", "==", data.name));  
        const itemsSnapshot = await getDocs(itemsQuery);
        if (!itemsSnapshot.empty) {
        const itemsArray = itemsSnapshot.docs.map(doc => ({
            
            ...doc.data(),
        }))
        data = itemsArray[0]
        oldName = data.name
        name = data.name
        desc = data.desc
        imageUrl = data.image
        manufacturer = data.manufacturer
        distributor = data.distributor
        price = data.price
        type = data.type
        url = data.url
        }
    })
async function editItem() {
    let item = {
        name: name,
        desc: desc,
        // imageUrl: imageUrl,
        manufacturer: manufacturer,
        distributor: distributor,
        price: price,
        url: url,
        type: type
    }
    const itemsRef = collection(db, type);
    await updateDoc(doc(itemsRef, oldName), item).then(() => {
        window.location.href = `/details/${name}?key=${type}`
    })
}
</script>

<div class="create-container">
    <div class="create-form">
    <label for="name">Name of Item</label>
    <input value={name} onchange={e => name = e.target.value} type="text" name="name" id="name">
    <label for="desc">Description</label>
    <textarea value={desc} name="desc" onchange={e => desc = e.target.value} id="desc" cols="30" rows="10"></textarea>
    <label for="image">Image</label>
    <input  type="file" name="image" id="image" accept="image/*">
    <label for="URL">URL:</label>
    <input type="text" value={url} onchange={e => url = e.target.value} name="URL" id="URL">
    <label for="manufacturer">Manufacturer:</label>
    <input value={manufacturer} type="text" onchange={e => manufacturer = e.target.value} name="manufacturer" id="manufacturer">
    <label for="distributor">Distributor:</label>
    <input type="text" value={distributor} onchange={e => distributor = e.target.value} name="distributor" id="distributor">
    <label for="price" >Price</label>
    <input value={price} type="number" onchange={e => price = e.target.value} name="price" id="price">
    <select name="type" id="type" value={type} onchange={e => type = e.target.value}>
        <option value="weapons">Weapons</option>
        <option value="gear">Gear</option>
        <option value="misc">Misc</option>
    </select>
    </div>
    <input onclick={editItem} type="button" value="Edit" class="create-btn">
    </div>
    <style>
        .create-form {
            display: flex;
            flex-direction: column;
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            margin-top:100px;
            
        }
       label {
           color: var(--text-color);
       }
        #image {
    color: var(--text-color);
        }
    
        .create-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
        }
        .create-btn {
            width: 20%;
            margin-top:20px;
            height:40px;
            border-radius: 20px;
            color: var(--main-color);
            border: 2px solid var(--main-color);
            background-color:transparent;
            cursor: pointer;
            transition: 0.3s all;
        }
        .create-btn:hover {
            background-color: var(--main-color);
            color: var(--background);
        }
    </style>
