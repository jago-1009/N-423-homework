<script>
import {getContext} from 'svelte';
let user = getContext('user')
const signOut = getContext('signOutUser').signOutUser
import logo from '../assets/img/logo.png'
import defaultProfile from '../assets/img/profile-icon-default.png'
import ProfileModal from './ProfileModal.svelte';
let isModalOn = $state(false);
function setModalOn() {
    isModalOn = !isModalOn
}
let query = $state('')
</script>

<nav >
    <div class="navbar">
    <div class="left">
<a href="/"><img src={logo} alt="Armorcoach logo"></a>

</div>
<div class="links">
    <div class="searchbox">
        <input bind:value={query} type="text" placeholder="Search for items...">
        <button id="searchBtn"onclick ={() => window.location.href = `/search/${query}`}>Search</button>
        </div>
        {#if user.isAdmin}
        <a href="/create" >Create Item</a>
        {/if}
{#if user.isSignedIn}
<a href="/cart">My Cart</a>

<a href="#" id="logout" onclick={setModalOn}><img src="{defaultProfile}" alt="profile"></a>
{#if isModalOn}
<ProfileModal />
{/if}
{:else}
<a href="/login">Log In/Sign Up</a>
{/if}
</div>
</div>
</nav>
<style>
    img {
        height:50px;
        
    }
    .left {
        display: flex;
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left:20px;
    }
    .links {
        width:75%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        
    }
    .navbar {
        display: flex;
        width: 100%;
        
        margin-top: 20px;
    }
    nav {
        display: flex;
        font-family: 'Cardo';
        font-size: 16px;
        justify-content: space-around;
        
        align-items: center;
        padding: 0;
        height:60px;
        margin-top:0px;
        background-color: #2E2E2E;

    }
    nav a {
        color:#FFFFF0;
        text-decoration: none;
    }
    .searchbox {
        display: flex;
        width:50%;
        justify-content: space-evenly;
    }
    .searchbox input {
        font-family: 'Cardo';
        width:75%;
        border-radius: 10px;
        border: 3px solid #DAA520;
        text-indent: 10px;
    }
    
    .searchbox button {
        font-family: 'Cardo';
        background-color: #FFFFF0;
        border-radius: 10px;
        font-size: 24px;
        border: 3px solid #DAA520;
        cursor: pointer;
    }
    .searchbox input:focus {
        outline: none;
    }
    </style>