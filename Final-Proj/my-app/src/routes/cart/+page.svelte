<script>
    import {getDoc, doc, setDoc, collection, updateDoc, arrayUnion, increment} from 'firebase/firestore'
    import {getFirestore} from 'firebase/firestore'
    import {app} from '../../app/firebaseConfig.js'
    import {onMount} from 'svelte'
    import {getContext} from 'svelte'
    import Card from '../../components/Card.svelte'
    // let transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     auth: {
    //         user: "w5LbS@example.com",
    //         pass: "v4t5y1kzqz8yq1kqz"
    //     }
    // })
    let user = getContext('user')
    let db = getFirestore(app)
    let data = []
    onMount(async () => {
        const docRef = doc(db, "carts", user.userData.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            data = docSnap.data().cart
            console.log(data)
        }
    })
    function checkTotal() {
        let total = 0;
        
    }
async function checkOut() {
    let totalObj = {
        "Socal Swords": [],
        "Blackfencer": [],
        "Purpleheart Armory": [],
    }

    try {
    data.forEach(async item => {
        console.log(item.distributor)
        
    totalObj[item.distributor].push(item);
    });
   
    for (const [key, value] of Object.entries(totalObj)) {
        console.log(value)
        if (value.length > 0) {
            let userObj = {}
            let userArr = []
            let userData = {}
            value.forEach(async data => {
                const dataPass = {
                name:data.name,
                desc:data.desc,
                imageUrl:data.imageUrl,
                distributor:data.distributor,
                manufacturer:data.manufacturer,
                price:data.price,
                url:data.url,
                type:data.type,
                orderedBy: user.userName
            }
            userData = dataPass
            userArr.push(dataPass)
            });
            userObj[user.userData.uid] = userArr
            const distRef = doc(db, "orders", key)
            const itemsRef = collection(distRef, "items")
            const dataRef = doc(itemsRef, "data")
            const dataCheck = await getDoc(dataRef)
           
            if (dataCheck[user.userData.uid]) {
                console.log(collection(dataRef, user.userData.uid))
    
                await updateDoc(dataRef, {
                    [user.userData.uid]: arrayUnion(userData)
                } )
                await updateDoc(dataRef, {
                    totalCount: increment(userArr.length)
                })
            }
            else {
                console.log(userObj)
                await setDoc(dataRef, userObj)
                await updateDoc(dataRef, {
                    totalCount: increment(userArr.length)
                })
            }
            
        }
        
    }
   if (data.length > 0) {
    alert("Order Placed Successfully!")
    window.location = "/";
       
   }
    // await setDoc(dataRef, item, {merge:true})
        
    // })
    setDoc(doc(db, "carts", user.userData.uid), {
        cart: []
    })
    checkTotal();
    
} catch (error) {
    console.log(error)
}
}
</script>

<h1>My Order</h1>
<div class="cards">
{#each data as item}

<Card imageSrc={item.image || "https://static.thenounproject.com/png/115013-200.png"} imageAlt={item.name} imageName={item.name} imageTypes={item.type} imagePrice={item.price} imageCollection={item.key} />

{/each}
</div>
<div class="check-out">
    <div class="check-btn" on:click={checkOut}>Check Out</div></div>
<style>
    .cards {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }
    h1 {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        color:#fffff0;
    }
    .check-out {
        margin-top:50px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        
    }
    .check-btn {
        width:50%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        
        color:#fffff0;
        background-color: #ffaa00;
        height:100px;
        border-radius: 10px;
        margin-bottom:50px;
        cursor: pointer;
    }
</style>