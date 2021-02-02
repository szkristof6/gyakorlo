<template>
  <section>
    <template v-if="!loading">
      <form>
        <b-steps
          v-model="activeStep"
          :animated="isAnimated"
          :rounded="isRounded"
          :has-navigation="hasNavigation"
          :icon-prev="prevIcon"
          :icon-next="nextIcon"
          :label-position="labelPosition"
          :mobile-mode="mobileMode"
        >
          <b-step-item step="1" label="Kezdés" :clickable="true">
            <h1 class="title has-text-centered mb-5">Kezdés</h1>
            <div class="mb-4"><label class="label"> Játékmód: *</label></div>
            <div class="columns">
              <div class="column">
                <b-switch name="+" type="is-success">Összeadás (+)</b-switch>
              </div>
              <div class="column">
                <b-switch name="-" type="is-warning">Kivonás (-)</b-switch>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-switch name="*" type="is-danger">Szorzás (*)</b-switch>
              </div>
              <div class="column">
                <b-switch name="/" type="is-info">Osztás (/)</b-switch>
              </div>
            </div>
            <b-message type="is-info">
              Hogyha több módot jelölsz ki, akkor random sorrendben fognak a
              műveletek a feladatokban jönni.
            </b-message>
            <div class="columns mb-6">
              <div class="column">
                <b-field label="Feladatok száma: *">
                  <b-input type="number" min="1" name="feladatszam"></b-input>
                </b-field>
              </div>
              <div class="column">
                <b-field name="legnagyobbszam" label="Legnagyobb szám: *">
                  <b-input
                    type="number"
                    min="1"
                    name="legnagyobbszam"
                  ></b-input>
                </b-field>
              </div>
            </div>
            <div>
              <div class="divider mt-6">Egyéb</div>
            </div>
            <b-message type="is-info">
              Ezeket a mezőket nem feltétlenül kell kitöltened! Ebben az esetben
              egy előre beállított érték lesz használva.
            </b-message>
            <div class="columns mb-4">
              <div class="column">
                <b-field label="Legkisebb szám:">
                  <b-input
                    name="legkisebbszam"
                    min="1"
                    :placeholder="2"
                    type="number"
                  ></b-input>
                </b-field>
              </div>
              <div class="column">
                <b-field label="Tagok száma:">
                  <b-input
                    name="tagokszama"
                    min="1"
                    :placeholder="2"
                    type="number"
                  ></b-input>
                </b-field>
              </div>
            </div>
          </b-step-item>

          <b-step-item step="2" label="Megoldás" :clickable="false">
            <h1 class="title has-text-centered">Megoldás</h1>
            <div class="tile is-ancestor">
              <div class="tile is-vertical">
                <div class="tile">
                  <div class="tile is-parent is-vertical">
                    <article class="tile is-child box">
                      <p class="title" id="maradek">0</p>
                      <p class="subtitle">feladat van hátra</p>
                    </article>
                  </div>
                  <div class="tile is-parent">
                    <article class="tile is-child box">
                      <p class="title" id="ido">00 : 00</p>
                      <p class="subtitle">ideje megy a kör</p>
                    </article>
                  </div>
                  <div class="tile is-parent">
                    <article class="tile is-child box">
                      <p class="title" id="pont">0</p>
                      <p class="subtitle">pontot érték eddig el</p>
                    </article>
                  </div>
                </div>
              </div>
            </div>
            <div class="tile is-ancestor mb-5r">
              <div class="tile is-vertical is-parent">
                <div class="tile custom-pelda is-child box">
                  <p class="subtitle">Az aktuális példa:</p>
                  <p class="title custom-feladat has-text-centered" id="pelda">
                    10+100
                  </p>
                </div>
              </div>
            </div>
            <b-field label="Megoldás *">
              <b-input type="number" size="is-medium" id="megoldas"></b-input>
            </b-field>
          </b-step-item>

          <b-step-item :step="3" label="Értékelés" :clickable="false">
            <h1 class="title has-text-centered">Értékelés</h1>
            <b-message type="is-info">
              Az újrakezdéshez, kattints a "Kezdés" gombra.
            </b-message>
            <div class="tile is-ancestor mb-2">
              <div class="tile is-vertical is-parent">
                <div class="tile custom-pelda is-child box">
                  <p class="title" id="elertpont">100</p>
                  <p class="subtitle">Elért pontok száma</p>
                </div>
              </div>
              <div class="tile is-vertical is-parent">
                <div class="tile custom-pelda is-child box">
                  <p class="title" id="osszesido">17 : 34</p>
                  <p class="subtitle">Megoldási idő</p>
                </div>
              </div>
            </div>
            <div class="tile is-ancestor">
              <div class="tile is-vertical">
                <div class="tile side-tile">
                  <div class="tile is-parent is-vertical">
                    <article class="tile is-child notification is-light">
                      <p class="title" id="atlag">00 : 21</p>
                      <p class="subtitle">Átlag megoldás</p>
                    </article>
                  </div>
                  <div class="tile is-parent">
                    <article class="tile is-child notification is-light">
                      <p class="title" id="gyors">00 : 02</p>
                      <p class="subtitle">Leggyorsabb megoldás</p>
                    </article>
                  </div>
                  <div class="tile is-parent">
                    <article class="tile is-child notification is-light">
                      <p class="title" id="lassu">01 : 37</p>
                      <p class="subtitle">Leglasabban megoldás</p>
                    </article>
                  </div>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column is-full">
                <table class="table custom-table is-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Feladat</th>
                      <th>Megoldási idő</th>
                      <th>Kapott pontok száma</th>
                    </tr>
                  </thead>
                  <tbody />
                </table>
              </div>
            </div>
          </b-step-item>

          <template
            v-if="customNavigation"
            slot="navigation"
            slot-scope="{ next }"
          >
            <div class="columns">
              <div class="column">
                <b-button
                  outlined
                  native-type="submit"
                  class="is-three-fifths is-offset-one-fifth"
                  style="width: 100%; height: 100%"
                  size="is-medium"
                  type="is-success"
                  icon-pack="fas"
                  icon-right="forward"
                  id="kovetkezo"
                  :disabled="next.disabled"
                  @click.prevent="start(next)"
                >
                  Elküldés
                </b-button>
              </div>
            </div>
          </template>
        </b-steps>
      </form>
    </template>
    <div class="columns" v-if="loading">
      <div class="column">
        <b-skeleton height="60px" width="100%" :active="loading"></b-skeleton>
      </div>
      <div class="column">
        <b-skeleton height="60px" width="100%" :active="loading"></b-skeleton>
      </div>
      <div class="column">
        <b-skeleton height="60px" width="100%" :active="loading"></b-skeleton>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import { mapActions, mapState } from "vuex";

export default {
  mounted() {},
  computed: mapState("game", ["isOn"]),
  methods: {
    ...mapActions("game", ["initGame", "startGame"]),
    async start(next) {
      if (!this.isOn) {
        const form = document.querySelector("form");
        const kezdoErtekek = await this.initGame(form);
        if (kezdoErtekek.error) {
          this.$buefy.snackbar.open(kezdoErtekek.error);
        } else {
          form.reset();
          this.InitstartGame(kezdoErtekek, next);
        }
      }
    },

    InitstartGame(kezdoErtekek, next) {
      const megoldas = document.querySelector("#megoldas");
      const maradek = document.querySelector("#maradek");
      const ido = document.querySelector("#ido");
      const pont = document.querySelector("#pont");
      const feladat = document.querySelector("#pelda");
      const gomb = document.querySelector("#kovetkezo");

      const game_object = {
        jelzok: {
          maradek,
          ido,
          pont,
          feladat,
        },
        megoldas,
        next,
        data: kezdoErtekek,
        gomb,
        document,
        levon: false,
      };
      setTimeout(() => {
        next.action();
      }, 0);
      this.startGame(game_object);
    },
  },
  data() {
    return {
      activeStep: 0,
      loading: false,

      showSocial: false,
      isAnimated: true,
      isRounded: true,
      isStepsClickable: false,

      hasNavigation: true,
      customNavigation: true,
      isProfileSuccess: false,

      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
      labelPosition: "bottom",
      mobileMode: "minimalist",
    };
  },
};
</script>

<style>
.step-content {
  padding: 2rem 0 !important;
}
.custom-feladat {
  font-size: 3rem;
  font-weight: 650;
}
.mb-5r {
  margin-bottom: 6rem !important;
}
.side-tile .title {
  font-size: 1.5rem !important;
}
.side-tile .subtitle {
  font-size: 1.1rem !important;
}
.custom-table {
  width: 100%;
  text-align: center;
}
</style>
