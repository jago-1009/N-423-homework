<script>
    import DesktopNav from "./DesktopNav.svelte";
    import { Hamburger } from "svelte-hamburgers";
    import { signOut, getAuth } from "firebase/auth";
    import MobileNav from "./MobileNav.svelte";
    import {getContext, setContext} from 'svelte';
    let width = $state(0);
    let isOpen = $state(false);
    let user = getContext('user')
    


</script>

<svelte:window bind:innerWidth={width}/>
{#if width>=800}
<DesktopNav user = {user} />
{:else}
<div class="bar">
<Hamburger open={isOpen} onclick={() => isOpen = !isOpen}  --color="#FFFFF0" --active-color="#FFFFF0"/>
<h1>ArmorCoach</h1>
<div class="icon">
    {#if user}
    <!-- <img src={icon} alt="icon" width="50" height="50"> -->
    {:else}
    <!-- <img src={icon} alt="icon" width="50" height="50"> -->
    {/if}
</div>
</div>
{#if isOpen == true}
<MobileNav user={user} ></MobileNav>
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