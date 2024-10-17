<script>
import Navbar from '../components/Navbar.svelte';
import {app} from '../app/firebaseConfig.js'
import {getAuth,onAuthStateChanged} from 'firebase/auth'

let user;
let width;
let open;
let userName = "to ArmorCoach!"
const auth = getAuth(app)
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
onAuthStateChanged(auth, (auth) => {
        if (auth) {
            console.log(auth)
            user = auth;
            
           userName = "back," + " " + capitalizeFirstLetter(user.displayName.split(" ")[0]) + "!"
        } else {
            console.log("user not logged in")
        }
    });
</script>
<Navbar user={user} />
<div id="app">
<h1>Welcome {userName}</h1>
</div>
<style>
    #app {
        font-family: 'Cardo';
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        
    }
</style>