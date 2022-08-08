<template>
  <div>
    <router-view/>
    <div class="footer-wrapper">
      <span>Kris Wood &copy; 2022</span>
    </div>
  </div>
</template>
<style>
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
  button {
    background-color: rgba(244, 112, 40) !important;
    border: 1px solid rgba(244, 112, 40) !important;
    font-size: 1rem !important;
    font-family: Roboto !important;
    font-weight: 400;
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