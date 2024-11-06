<script>

    import {fly} from 'svelte/transition'
    import { getContext } from 'svelte';
    let user = getContext('user')

    </script>
    <div class="nav-mobile">
    <nav transition:fly>
        <a href="/">Home</a>
        <div class="searchbox">
        <input type="text" placeholder="Search for items...">
        <button id="searchBtn">Search</button>
        </div>
        {#if user.isAdmin}
        <a href="/admin">View Group Orders</a>
        {/if}
        {#if user.isSignedIn}
        <!-- <img src={imageSrc} alt=""> -->
        <a id="logout" href="#" on:click={getContext('signOutUser').signOutUser()}>Log Out</a>
        {:else}
        <a href="/login">Log In/Sign Up</a>
        {/if}
        </nav>
    </div>
        <style>
        
            nav {
                display: flex;
                align-items: center;
                justify-content: space-evenly;
                height:200px;
                flex-direction: column;
                font-family: 'Cardo';
        font-size: 16px;
        padding: 0;
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
    .nav-mobile {
        width: 100%;
        position: absolute;
        z-index: 99;
    }
        </style>