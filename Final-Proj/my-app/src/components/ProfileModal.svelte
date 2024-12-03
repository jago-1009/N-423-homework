<script>
   import {getContext} from 'svelte';
</script>

<div class="modal">
<a href="#" on:click={getContext('signOutUser').signOutUser()}>Log Out</a>
</div>

<style>
    .modal {
        top:50px;
        right:100px;
        width:200px;
        height:100px;
        position: absolute;
        background-color: #2e2e2e;
        border: 2px solid #ffaa00;
        border-radius: 20px;
        display: flex;
        
        justify-content: space-evenly;
        
    }
    .modal * {
        margin-top:40px;
        color:#ffaa00;
    }
</style>