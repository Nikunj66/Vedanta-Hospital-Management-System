
<template>
  <div class="skin-green">
    <div class="wrapper">
      
      <navbar />
      <sidebar />

      <!-- Right side column. Contains the navbar and content of the page -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content">
            <router-view/>
        </section>
      </div>
      <footerview/>
    </div>
  </div>
</template>


<script>
import navbar from './../../components/navbar.vue'
import sidebar from './../../components/sidebar.vue'
import footerview from './../../components/footer.vue'
export default {
  components:{
    navbar,
    sidebar,
    footerview
  }
};


</script>