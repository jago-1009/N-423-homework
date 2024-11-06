<script>
    import Navbar from "../../components/Navbar.svelte";
    import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,GoogleAuthProvider, onAuthStateChanged, updateProfile} from 'firebase/auth'
    import ErrorModal from "../../components/ErrorModal.svelte";
    import { getContext } from 'svelte';
	import { app } from "../../app/firebaseConfig";
    let fName;
    let lName;
    let email;
    let pass;
    let errorShowing = false;
    let errorText = "";
    let pageType = "login";
    let user = getContext('user');
    
    const auth = getAuth(app);
    function throwError(errorCode) {
        errorShowing = true;
        errorText = errorCode
    }
    function signUpUser(fName,lName,email,pass) {
        createUserWithEmailAndPassword(auth,email,pass)
        .then((userCredential) => {
            // Signed in
            updateProfile(auth.currentUser, {
                displayName: fName + " " + lName
            })
            const user = userCredential.user;
            
            console.log(user)
            window.location.href = "/"
            // ...
        })
        .catch((error) => {
            throwError(error.code)
        });
    }
    function signInUser(email,pass) {
    signInWithEmailAndPassword(auth,email,pass)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        window.location.href = "/"
        // ...
    })
    .catch((error) => {
        console.log(error)
        throwError(error.code)
    });
        
       
    }
   
    
    </script>
{#if errorShowing}
<ErrorModal bind:errorShowing errorCode={errorText} />
{/if}
<div id="app">
<div class="form">
{#if user.isSignedIn}
<div class="loggedIn">
<h1>You are already logged in. Would you like to log out?</h1>
<div class="card example-1">
    <input type="submit" value="Log Out" on:click={getContext('signOutUser').signOutUser()} class="inner">
    </div>
</div>
{:else}
<div class="page-type"><a href="#" on:click={() => {pageType = "login"}}>Login</a><a href="#" on:click={() => {pageType = "signup"}}>Sign Up</a></div>
{#if pageType == "login"}
<div class="formSignIn">
<h1>Log in</h1>

<label for="fName">Email</label>
<input type="email" name="email" id="email" bind:value={email}>
<label for="fName">Password</label>
<input type="password" name="pass" id="pass" bind:value={pass}>
<div class="card example-1">
<input type="submit" value="Sign In" on:click={signInUser(email,pass)} class="inner">
</div>
</div>
{/if}
{#if pageType == "signup"}

<div class="formSignUp">
    <h1>Sign Up</h1>
    <label for="fName">First Name</label>
    <input type="text" name="fName" id="fName" bind:value={fName}>
    <label for="fName">Last Name</label>
    <input type="text" name="lName" id="lName" bind:value={lName}>
    <label for="fName">Email</label>
    <input type="email" name="email" id="email" bind:value={email}>
    <label for="fName">Password</label>
    <input type="password" name="pass" id="pass" bind:value={pass}>
    <div class="card example-1">
        <input type="submit" value="Sign Up" on:click={signUpUser(fName, lName,email,pass)} class="inner">
        </div>
</div>
{/if}
{/if}
</div>
</div>
<style>
    :root {
        --border-radius: 25px;
    }
    .loggedIn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;        
    }
    .loggedIn h1 {
        text-decoration: none;
        color:#fffff0;
        font-size: 24px;
       
    }
    .page-type {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        height:50px;
        
    }
    .page-type a {
        text-decoration: none;
        color:#fffff0;
        font-size: 24px;
        width:100px;
        text-align: center;
        background-color: #DAA520;
        border-radius: 10px;
        padding:5px;
        border: #222 solid 3px;
    }
.card {
  max-width: 400px;
  width: 100%;
  margin: 50px ;
  border-radius: var(--border-radius);

}

.card .inner {
    border: none;
    font-size: 24px;
  padding: 25px;
  background: #222;
  color: #fff;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition-duration: 0.5s;
}

.example-1 {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.example-1 .inner {
  position: relative;
  z-index: 1;
  width: 100%;
  margin: 5px;
}
.example-1::before {
  content: "";
  display: block;
  background: linear-gradient(90deg, rgba(124,94,18,1) 0%, rgba(255,238,45,1) 100%);
  height: 500px;
  width: 500px;
  position: absolute;
  animation: rotate 5s linear infinite;
  z-index: 0;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
  .formSignIn, .formSignUp {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
        font-family: 'Cardo';
        color:#fffff0;
    }
    .formSignIn input, .formSignUp input {
        border-radius: 5px;
        border:#DAA520 solid 3px;
    }
    .form {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        height: 50vh;
        flex-direction: column;
    }
    #app {
        height:calc(100vh - 60px);
        background-color: #2E2E2E;
    }
</style>