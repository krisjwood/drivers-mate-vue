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
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    color: black;
    text-align: center;
  }
</style>