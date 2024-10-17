<script>
import {key,app} from '../app/firebaseConfig.js'
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
const messaging = async () => (await isSupported()) && getMessaging(app)
function requestPermission() {
    console.log("requesting permission")
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("permission granted")
        }
    })
}
function sendNotification() {
   
}
getToken(messaging, { vapidKey: key }).then((currentToken) => {
        if (currentToken) {
            console.log(currentToken)
        } else {
            console.log("No registration token available. Request permission to generate one.");
        }

    }).catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
    });

</script>


<div class="card">
<h1>NOTIFICATION TEST</h1>
<button on:click={sendNotification}>SEND</button>
</div>

<style>
.card {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
}
</style>