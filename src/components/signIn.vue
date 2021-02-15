<template>
    <div>
        
        <img class="wave" src="images/wave.png">
        <div class="container">
            <div class="img">
                
                <img src="images/bg.svg">
            </div>
            <div class="login-content">
                <form action="index.html">
                    <img src="images/avatar.svg">
                    <h2 class="title">Login</h2>
                    <div class="input-div one focus">
                    <div class="i">
                            <i class="fas fa-user"></i>
                    </div>
                    <div class="div">
                            <h5>Username</h5>
                            <input type="text" class="input">
                    </div>
                    </div>
                    <div class="input-div pass focus">
                    <div class="i"> 
                            <i class="fas fa-lock"></i>
                    </div>
                    <div class="div">
                            <h5>Password</h5>
                            <input type="password" class="input">
                    </div>
                    </div>
                    <a href="#">Forgot Password?</a>
                    <input type="submit" class="btn" value="Login">
                </form>
            </div>
        </div>
    </div>
</template>

<style>
    @import '<%= BASE_URL %>css/style.css';
    @import 'https://fonts.googleapis.com/css?family=Poppins:600&display=swap';
</style>

<script>

export default {
    name:'signIn',
    mounted() {

      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src','https://kit.fontawesome.com/a81368914c.js')
      document.head.appendChild(recaptchaScript)
    },
    
     
}

</script>