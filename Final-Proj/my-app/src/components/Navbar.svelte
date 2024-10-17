<script>
    import DesktopNav from "./DesktopNav.svelte";
    import {app} from '../app/firebaseConfig'
    import { Hamburger } from "svelte-hamburgers";
    import { signOut, getAuth } from "firebase/auth";
    import MobileNav from "./MobileNav.svelte";
    import defaulticon from '../assets/img/profile-icon-default.png'
    const auth = getAuth(app)
    let width;
    let open;
    export let user;
    function signOutUser() {
        console.log("USER")
        signOut(auth).then(() => {
            user = null
            console.log("user signed out")
            window.location.href = "/login"
        })
    }
</script>


<svelte:window bind:innerWidth={width}/>
{#if width>=800}
<DesktopNav user = {user} signOutUser = {signOutUser}/>
{:else}
<div class="bar">
<Hamburger bind:open --color="#FFFFF0" --active-color="#FFFFF0"/>
<h1>ArmorCoach</h1>
<div class="icon">
    {#if user}
    <!-- <img src={icon} alt="icon" width="50" height="50"> -->
    {:else}
    {/if}
</div>
</div>
{#if open} 
<MobileNav user={user} signOutUser = {signOutUser}></MobileNav>

{/if}
{/if}
<style>
    .bar {
    background-color: #2E2E2E;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
}
h1 {
    font-family: 'Cardo';
    color:#fffff0;
}
.icon {
    background-color: #fffff0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 50%;
}
</style>