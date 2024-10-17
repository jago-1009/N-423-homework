<script>
    export let errorCode;
    export let errorShowing;
</script>

<div class="error-screen">
<div class="error-modal">
    <div class="close-button" on:click = {() => {errorShowing = false}}  >
    <svg width="40" height="40" viewbox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30" stroke="black" stroke-width="4" /></svg>
</div>
<h1>ERROR {errorCode}</h1>
<p>We're sorry: there was an error. </p>
</div>
</div>

<style>
    .error-modal {
        display: block;
        text-align: center;
        height: 300px;
        width: 50%;
        background-color: orangered;
        margin:25% ;
        
    }
    .error-screen {
        position: absolute;
        display: block;
        
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100%;
        background-color: #00000080;
        z-index: 999
    }
    svg {
       
    height: 40px;
    width: 40px;
}
.close-button {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-end;
}
</style>