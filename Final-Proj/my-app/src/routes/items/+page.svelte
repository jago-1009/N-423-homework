<script>
import Navbar from '../../components/Navbar.svelte';
import ItemDetails from '../../components/ItemDetails.svelte';
import {app} from '../../app/firebaseConfig.js'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
let user;
let auth = getAuth(app)
    onAuthStateChanged(auth, (auth) => {
        if (auth) {
          
            user = auth;
           
        } else {
            console.log("user not logged in")
        }
    });
</script>

<Navbar user = {user} />
<ItemDetails />
