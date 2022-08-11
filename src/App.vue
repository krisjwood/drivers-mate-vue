<template>
  <div>
    <div class="overlay" v-if="show && this.$route.name === 'landing'">
      <b-overlay show rounded="sm">
        <template #overlay>
          <div class="text-center">
            <div class="row d-flex justify-content-center">
              <i class="fa-solid fa-triangle-exclamation fa-fade"></i>
            </div>
            <h2>This application is intended for mobile and tablet use.</h2>
            <h3>Viewing on a desktop may be difficult to navigate or result in unexpected behaviour.</h3>
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
    <div v-else>
      <router-view/>
      <b-button squared id="page-top" size="lg" v-show="scrollY > 1" @click="scrollToTop">
        <i class="fa-solid fa-angle-up"></i>
      </b-button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'App',
  data() {
    return {
      show: false,
      scrollTimer: 0,
      scrollY: 0,
    }
  },
  created() {
    this.checkIfDesktop()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    /** Displays warning if no mobile or tablet device detected */
    checkIfDesktop() {
      if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.show = true;
      }
    },
    closeOverlay() {
      this.show = false;
    },
    handleScroll() {
        if (this.scrollTimer) return;
        this.scrollTimer = setTimeout(() => {
          this.scrollY = window.scrollY;
          clearTimeout(this.scrollTimer);
          this.scrollTimer = 0;
        }, 100);
      },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
  }
}
</script>
<style>
  .overlay {
    margin-top: 35vh;
  }
  #page-top {
    z-index: 999;
    position: fixed;
    bottom: 50px;
    right: 50px;
    background-color: rgba(19, 28, 69) !important;
    border: none !important;
  }

  .fa-triangle-exclamation {
    font-size: 10rem;
    color: rgba(244, 112, 40);
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