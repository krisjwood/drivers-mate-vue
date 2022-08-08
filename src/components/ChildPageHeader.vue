<template>
  <div>
    <div class="row d-flex justify-content-between align-items-center">
      <div class="col-8">
        <img class="h-auto w-100" src="../assets/drivers-mate-nl-logo-child.png" alt="Netlogix Driver's Mate Logo">
      </div>
      <div class="col">
        <div class="row d-flex justify-content-end align-items-center mr-3">
          <b-avatar size="1rem"></b-avatar>
          <div class="ml-1"><b>{{ display.selectedDriver }}</b></div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center mb-2 title-wrapper">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ChildPageHeader',
    props: {
      title: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        display: {
          selectedDriver: '',
        }
      }
    },
    mounted() {
      if (sessionStorage.getItem('selectedDriver')) {
        this.display.selectedDriver = sessionStorage.getItem("selectedDriver");
      }
    }
  }
</script>
<style>
  h1 {
    color: white;
  }

  .title-wrapper {
    background-color: rgba(19, 28, 69);
  }
</style>