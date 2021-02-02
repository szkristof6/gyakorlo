<template>
  <div id="app">
    <div class="column is-8 is-offset-2">
      <nav class="navbar custom-navbar">
        <div class="navbar-brand">
          <a class="navbar-item" href="/#/">
            <img src="favicon.ico" width="auto" height="28" />
          </a>
        </div>
        <div class="custom-navbar-end" v-if="isLoggedIn">
          <div class="navbar-item">
            <div class="field is-grouped">
              <div class="control m-2">
                <b-taglist attached v-if="LoadedUser">
                    <b-tag type="is-light">{{user.name}}</b-tag>
                    <b-tag type="is-success">
                      {{users.find(x => x.id === user.id).pont}} Pont
                    </b-tag>
                </b-taglist>
                <b-skeleton size="is-large" width="7rem" :active="!LoadedUser"></b-skeleton>
              </div>
              <p class="control">
                <button class="button is-light is-rounded" @click="logout()">
                  <span class="icon is-small">
                    <i class="fas fa-sign-out-alt"></i>
                  </span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </nav>
      <div class="card mt-5">
        <header class="card-header">
          <div class="b-tabs is-fullwidth mt-2"  v-if="isLoggedIn">
            <nav class="tabs is-fullwidth">
              <ul>
                <li class="is-active" id="home" name="nav">
                  <router-link
                    :to="{ name: 'home' }">
                    Home
                  </router-link>
                </li>
                <li id="feladat" name="nav">
                  <router-link
                    :to="{ name: 'feladat' }">
                    Feladat
                  </router-link>
                </li>
                <li id="eredmenyek" name="nav">
                  <router-link
                    :to="{ name: 'eredmenyek' }">
                    Eredmények
                  </router-link>
                </li>
              </ul>
            </nav>
          </div>
          <p class="card-header-title" v-else>
          Bejelentkezés
        </p>
        </header>
        <div class="card-content">
          <router-view class="container" />
        </div>
     </div>
   </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  mounted() {
    this.init();
  },
  watch: {
    $route(to) {
      const navs = document.getElementsByName('nav');
      navs.forEach((item, i) => {
        if (item.id === to.name) {
          document.querySelector('.is-active').classList.remove('is-active');
          navs[i].classList.add('is-active');
        }
      });
    },
  },
  computed: {
    ...mapState('users', ['users', 'LoadedUser']),
    ...mapState('auth', ['isLoggedIn', 'user']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('users', ['init', 'InitPaginate', 'NextPaginate', 'BackPaginate']),
  },
};
</script>

<style lang="scss">
@import 'bulma';
@import '~@creativebulma/bulma-collapsible';
@import "~@creativebulma/bulma-divider";
.custom-navbar {
  background-color: white;
  border-radius: 0.25rem;
  -webkit-box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0px 0 1px rgba(10, 10, 10, 0.2);
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0px 0 1px rgba(77, 35, 35, 0.02);
  color: #4a4a4a;
  max-width: 100%;
}
.custom-navbar-end{
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  margin-left: auto;
}
.custom-navbar, .custom-navbar-end{
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.tags:not(:last-child) {
  margin-bottom: 0;
}
</style>
