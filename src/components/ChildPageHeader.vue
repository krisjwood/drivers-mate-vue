<template>
  <div>
    <div class="row d-flex justify-content-between align-items-center">
      <div class="col-8">
        <img class="h-auto w-100" src="../assets/drivers-mate-nl-logo-child.png" alt="Netlogix Driver's Mate Logo">
      </div>
      <div class="col d-flex justify-content-end mr-1 mb-1 py-0">
          <b-button squared size="sm" class="p-0 user-button">
            <b-avatar class="user-icon" size="md" square button @click="userManagement"></b-avatar>
            <b-badge class="mr-1" variant="warning" pill>6</b-badge>
          </b-button>
      </div>
      </div>
    <div v-if="show" class="d-flex justify-content-center align-items-center mb-2 title-wrapper">
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
      },
      show: {
        type: Boolean,
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
    },
    methods: {
      /** Opens user management modal */
      userManagement() {
        this.$bvModal.msgBoxOk("Sorry, user management hasn't been released yet. Check back soon!", {
          title: '6 notifications',
          size: 'md',
          buttonSize: 'sm',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0'
        })
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

  .user-button:hover {
    background-color: rgba(244, 112, 40) !important;
  }

  .user-icon:hover {
    background-color: rgba(244, 112, 40) !important;
    color: rgba(19, 28, 69) !important;
  }
</style>