
<style>
    @import 'https://fonts.googleapis.com/css?family=Poppins:600&display=swap';
</style>
<template>
    <div>
        <img class="wave" src="images/wave.png">
<div class="container">
    <div class="img">
        <img src="images/bg.svg">
    </div>
    <div class="login-content">
        <form action="" method="post">
            <img src="images/avatar.svg">
            <h2 class="title">Register</h2>
            <div class="input-div one focus">
                <div class="i">
                    <i class="fas fa-pen"></i>
                </div>
                <div class="div">
                    <h5>Name</h5>
                    <input id="name" type="text" class="input" name="name" value="" required autocomplete="name">

                </div>
                
            </div>
            
            <div class="input-div email">
                <div class="i">
                    <i class="fas fa-user"></i>
                </div>
                <div class="div">
                    <h5>Email Address</h5>
                    <input id="email" type="email" class="input"  name="email" value="" required autocomplete="email">
                </div>
            </div>
            
            <div class="input-div pass">
                <div class="i">
                    <i class="fas fa-lock"></i>
                </div>
                <div class="div">
                    <h5>Password</h5>
                    <input id="password" type="password" class="input"  name="password" required autocomplete="new-password">
                </div>
            </div>

            <div class="input-div repass">
                <div class="i">
                    <i class="fas fa-lock"></i>
                </div>
                <div class="div">
                    <h5>Confirm Password</h5>
                    <input id="password-confirm" type="password" class="input" name="password_confirmation" required autocomplete="new-password">
                </div>
            </div>
            <br>
            
            <input type="submit" class="btn" value="Register">
        </form>
    </div>
</div>
    </div>
</template>


<script>

export default {
    name:'signUp',
    mounted() {

      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src','https://kit.fontawesome.com/a81368914c.js')
      document.head.appendChild(recaptchaScript)

      let recaptchaScript1 = document.createElement('script')
      recaptchaScript1.setAttribute('src','./../../public/js/main')
      document.head.appendChild(recaptchaScript1)
    },
    
}
</script>