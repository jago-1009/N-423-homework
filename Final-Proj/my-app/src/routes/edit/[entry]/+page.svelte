<script>
 import {app} from '../../../app/firebaseConfig.js'
    import {getFirestore, doc, getDoc, setDoc, onSnapshot, collection, getDocs, query, limit, where, updateDoc, arrayUnion, deleteDoc } from 'firebase/firestore'
    import {getContext, onMount, setContext, tick} from 'svelte';
    import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
    import { getStorage } from "firebase/storage";
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
    const storage = getStorage();
    async function uploadFile(file) {
        
        const pathRef = ref(storage, `images/${file.name}`);
        const storageRef = ref(storage,pathRef);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, 
        (error) => {
            console.log(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                imageUrl = downloadURL;
            });
        })
       
        }
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
        imageUrl = data.imageUrl
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
        imageUrl: imageUrl,
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
async function showModal() {
    document.getElementById("delete-modal").classList.toggle("hidden");
}

async function deleteItem() {
    // console.log(type, oldName);
    const itemsRef = collection(db, type);
    await deleteDoc(doc(itemsRef, oldName)).then(() => {
        window.location.href = `/`
    })
}
</script>

<div class="create-container">
    <div class="create-form">
    <label for="name">Name of Item</label>
    <input value={name} onchange={e => name = e.target.value} type="text" name="name" id="name">
    <label for="desc">Description</label>
    <textarea value={desc} name="desc" onchange={e => desc = e.target.value} id="desc" cols="30" rows="10"></textarea>
    <img src={imageUrl} alt="image" width={300}>
    <label for="image">Image</label>
    <input onchange={e => uploadFile(e.target.files[0])}  type="file" name="image" id="image" accept="image/*">
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
    <input onclick={showModal} type="button" value="Delete" class="delete-btn">
    </div>
    
        <div id="delete-modal" class="hidden">
            <div class="modal">
                <div class="modal-content">
                    <h1>Delete {data.name}</h1>
                    <p><strong>Are you sure</strong> you want to delete this item? You won't be able to undo this action.</p>
                   <div class="modal-btns">
                    <button onclick={deleteItem} class="delete-confirm">Delete</button>
                    <button onclick={showModal} class="cancel-btn">Cancel</button>
                   </div>
                </div>
            </div>
        </div>
    <style>
        .delete-confirm {
            background-color: red;
        height:40px;
        width:100px;
        border:none;
        border-radius:20px;
        cursor: pointer;
        }
        .cancel-btn {
            background-color: var(--main-color);    
        height:40px;
        width:100px;
        border:none;
        border-radius:20px;
        cursor: pointer;
        }
        .modal {
            background-color:var(--background);
            height:fit-content;
            width:300px;
            border-radius:20px;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            flex-direction: column;
            border: 5px solid var(--main-color);
            color:var(--main-color);
        }
        .modal p {
            text-align: center;
        }
        
        .modal-content {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            flex-direction: column;
        }
        #delete-modal {
            top:25%;
            left:25%;
            display: flex;
            flex-direction: column;
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            position: fixed;
        }
        
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
        .create-btn, .delete-btn {
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
        .modal-btns {
            margin-bottom:20px;
        }
        .create-btn:hover {
            background-color: var(--main-color);
            color: var(--background);
        }
        .delete-btn {
            background-color: #ff0000;
            color: var(--background);
            border: 2px solid var(--background);
        }
        .hidden {
            display: none !important;
        }
    </style>
