<script>
    let {imageSrc, imageAlt, imageName, imageTypes, imagePrice,imageCollection} = $props();
</script>

<div class="card">
<img class="img" src={imageSrc} alt={imageAlt}>
<h3>{imageName}</h3><h3>Types: <div class="types">{imageTypes}</div></h3><h3>{imagePrice}</h3>
<a href="/details/{imageName}?key={imageCollection}">Read More</a>
</div>



<style>
    .card {
    
       width: 200px;
       aspect-ratio: 0.8/1;
       background-color: var(--main-color);
       border-radius: 10px;
       display: flex;
       align-items: center;
       justify-content: space-evenly;
       flex-direction: column;
        margin:20px;
    }
    .types {
        font-weight: bold;
    }
    .img {
        width: calc(100% - 50px);
        border: 5px solid var(--background);
        border-radius: 10px;
        margin: 5px;
    }
    h3 {
        font-family: 'Cardo';
        font-size: 16px;
        color:var(--background);
        width: 100%;
        text-align: center;
        margin: 0;
        padding:5px
    }
    a {
        font-family: 'Cardo';
        font-size: 16px;
        background-color: var(--main-color);
        width: 50%;
        text-align: center;
        margin-bottom: 10px;
        margin-top: 5px;
        padding:5px;
        color: var(--background);
        border-radius: 10px;
        transition: all 0.2s ease-in-out;
        text-decoration: none;
        box-sizing: border-box;
        border: 2px solid var(--background);
    }
    a:hover {
        background-color: var(--main-color);
        color: var(--background);
        -webkit-box-shadow: 10px 10px 20px 0px var(--background);
-moz-box-shadow: 10px 10px 20px 0px var(--background);
box-shadow: 5px 5px 10px 0px var(--background);
    }
</style>