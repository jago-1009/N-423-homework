<script>
    import {setContext} from 'svelte';
import {getAuth, signOut, onAuthStateChanged} from "firebase/auth"
import {app} from '../app/firebaseConfig.js'
import Navbar from '../components/Navbar.svelte';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

let { children } = $props();
let userState = $state({
    isSignedIn: false,
    userData: null,
    userName: "to Armorcoach",
    isAdmin: false,
})
let adminState = $state({
    db: null,
    auth: null
})
const db = getFirestore(app)
const auth = getAuth(app)
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function signOutUser() {
        // console.log("USER")
        signOut(auth).then(() => {
            userState.isSignedIn = false
            userState.userData = null
            console.log("user signed out")
            window.location.href = "/"
        })
    }
    setContext('signOutUser', {signOutUser})
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            await user.getIdToken(true);
            userState.userData = user
            userState.isSignedIn = true
            adminState.db = db
            adminState.auth = auth
            userState.userName  = capitalizeFirstLetter(userState.userData.displayName)
            // Get custom claims
            const docRef = onSnapshot(doc(db, "users",user.uid), (user) => {
                if (user.data().role == 'admin') {
                    // console.log('admin')
                    userState.isAdmin = true;
                    
                    // console.log(adminState)
                }
            }) 

            // console.log(user)
        } else {
            console.log("user not logged in")
        }
        
    });
    setContext('user', userState)
    setContext('admin', adminState)
</script>
<Navbar/>
{@render children()}

<style>
    :root {
        --background: #2e2e2e;
        --main-color:#ffaa00;
        --text-color:#fffff0;
    }
    
    @font-face {
        font-family: 'Cardo';
        src: url('../assets/fonts/Cardo-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'Cardo';
        src: url('../assets/fonts/Cardo-Bold.ttf') format('truetype');
        font-weight: bold;
        font-style: normal;
    }
    @font-face {
        font-family: 'Cardo';
        src: url('../assets/fonts/Cardo-Italic.ttf') format('truetype');
        font-weight: normal;
        font-style: italic;
    }
</style>