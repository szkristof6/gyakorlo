<template>
  <div class="home">
    <div class="content">
      <p class="buttons is-centered">
        <button class="button is-light is-medium is-rounded" @click='login()'>
          <span class="icon is-small">
            <i class="fab fa-google"></i>
          </span>
          <span>Google bejelentkezés</span>
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  mounted() {
    // this.unbindUsers();
  },
  name: 'Login',
  methods: mapActions('auth', ['login', 'unbindUsers']),
};
</script>
