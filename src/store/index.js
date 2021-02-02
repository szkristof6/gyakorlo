/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';

import users from './users';
import game from './game';
import auth from './auth';
import eredmenyek from './eredmenyek';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    game,
    users,
    eredmenyek,
  },
  mutations: vuexfireMutations,
});
