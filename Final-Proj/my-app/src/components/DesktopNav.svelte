<script>
export let user;

export let signOutUser;

</script>

<nav >
<a href="/">Home</a>
<div class="searchbox">
<input type="text" placeholder="Search for items...">
<button id="searchBtn">Search</button>
</div>
<a href="/chat">Chat</a>
{#if user}
<!-- <img src={imageSrc} alt=""> -->
<a href="#" id="logout" on:click={signOutUser}>Log Out</a>
{:else}
<a href="/login">Log In/Sign Up</a>
{/if}
</nav>
<style>
    @font-face {
        font-family: 'Cardo';
        src: url('../fonts/Cardo-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'Cardo';
        src: url('../fonts/Cardo-Bold.ttf') format('truetype');
        font-weight: bold;
        font-style: normal;
    }
    @font-face {
        font-family: 'Cardo';
        src: url('../fonts/Cardo-Italic.ttf') format('truetype');
        font-weight: normal;
        font-style: italic;
    }
    nav {
        display: flex;
        font-family: 'Cardo';
        font-size: 24px;
        justify-content: space-evenly;
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