<template>
  <div>
    <div class="overlay" v-show="show">
      <b-overlay show rounded="sm">
        <router-view/>
        <div class="footer-wrapper">
          <span>Kris Wood &copy; 2022</span>
        </div>
      <template #overlay>
        <div class="text-center">
          <div class="row justify-content-center">
              <i class="fa-solid fa-triangle-exclamation fa-fade"></i>
            <h2>This application is intended for mobile and tablet use only.</h2>
            <h3>Viewing on a desktop may be difficult to navigate or result in unexpected behaviour.</h3>
          </div>
          <div>
            <b-button
              class="mt-5"
              ref="cancel"
              size="sm"
              aria-describedby="cancel-label"
              @click="closeOverlay()"
              squared
              >
              Cancel
            </b-button>
          </div>
        </div>
      </template>
    </b-overlay>
    </div>
    <div else>
      <router-view/>
      <div class="footer-wrapper">
        <span>Kris Wood &copy; 2022</span>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      show: false,
    }
  },
  created() {
    this.checkIfDesktop()
  },
  methods: {
    checkIfDesktop() {
      if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.show = true;
      }
    },
    closeOverlay() {
      this.show = false;
    }
  }
}
</script>
<style>
  .fa-triangle-exclamation {
    font-size: 10rem;
    color: rgba(244, 112, 40);
  }
  .footer-wrapper {
    position: static;
    left: 0;
    bottom: 0;
    width: 100%;
    color: black;
    background-color: white;
    text-align: center;
    padding: 10px 0px;
  }

  body {
    height: 100vh;
    padding: 1rem;
    padding-bottom: 20px;
  }

  /* Netlogix styles override */
  button:not(.close)  {
    background-color: rgba(244, 112, 40) !important;
    border: 1px solid rgba(244, 112, 40) !important;
    font-size: 1rem !important;
    font-family: Roboto !important;
    font-weight: 400 !important;
  }

  button:hover {
    background-color: inherit !important;
    color: rgba(244, 112, 40) !important;
  }

  h {
    font-family: Saira !important;
  }

  div:first-of-type {
    animation: fadeInAnimation ease-in 1s;
  }

  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>