<template>
  <div v-if="loading" class="my-3">
    <div class="row d-flex justify-content-center mb-1">
      <b-spinner style="width: 3rem; height: 3rem;" :label="loadingMessage"></b-spinner>
    </div>
    <div class="row d-flex justify-content-center">
      <span>{{ loadingMessage }}</span>
    </div>
  </div>
  <div v-else-if="error">
    <b-alert 
      show
      dismissible
      variant="danger"
      >
      {{ errorMessage }}. Refresh or <b-link href="/">Go home</b-link>
    </b-alert>
  </div>
</template>
<script>
  export default {
    name: 'LoadingAndErrorHandler',
    props: {
      loading: {
        type: Boolean,
        required: true,
      },
      loadingMessage: {
        type: String,
        required: true,
      },
      error: {
        type: Boolean,
        required: true,
      },
      errorMessage: {
        type: String,
        required: true,
      }
    },
  }
</script>