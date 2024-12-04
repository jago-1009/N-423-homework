<script>
   
    import {getFirestore, collection, addDoc, setDoc, doc} from 'firebase/firestore'
    import {app} from '../../app/firebaseConfig.js'
    import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
    let db = getFirestore(app);
    let name = $state('')
    let desc = $state('')
    let manufacturer = $state('')
    let distributor = $state('')
    let price = $state('')
    let type= $state('weapons')
    let url = $state('');
    let imageUrl = $state('');
    const storage = getStorage();
    function uploadFile(file) {
        
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
async function createItem() {
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
    const dataDoc = doc(itemsRef, item.name);
    await setDoc(dataDoc, item);
    return window.location.href = `/details/${name}?key=${type}`
}

</script>


<div class="create-container">
<div class="create-form">
<label for="name">Name of Item</label>
<input onchange={e => name = e.target.value} type="text" name="name" id="name">
<label for="desc">Description</label>
<textarea name="desc" onchange={e => desc = e.target.value} id="desc" cols="30" rows="10"></textarea>
<img src={imageUrl} alt="image" width={300}>
<label for="image">Image</label>
<input type="file" onchange={e => uploadFile(e.target.files[0])} name="image" id="image" accept="image/*">
<label for="URL">URL:</label>
<input type="text" value={url} onchange={e => url = e.target.value} name="URL" id="URL">
<label for="manufacturer">Manufacturer:</label>
<input type="text" onchange={e => manufacturer = e.target.value} name="manufacturer" id="manufacturer">
<label for="distributor">Distributor:</label>
<input type="text" value={distributor} onchange={e => distributor = e.target.value} name="distributor" id="distributor">
<label for="price" >Price</label>
<input type="number" onchange={e => price = e.target.value} name="price" id="price">
<select name="type" id="type" value={type} onchange={e => type = e.target.value}>
    <option value="weapons">Weapons</option>
    <option value="gear">Gear</option>
    <option value="misc">Misc</option>
</select>
</div>
<input onclick={createItem} type="button" value="Create" class="create-btn">
</div>
<style>
    img {
        margin-top:20px;
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