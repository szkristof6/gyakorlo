<template>
  <section>

    <b-table
      :data="eredmenyek"
      ref="table"
      :opened-detailed="defaultOpenedDetails"
      detailed
      detail-key="id"
      :show-detail-icon="showDetailIcon"
      v-if="LoadedEredmenyek"
    >
      <b-table-column label="ID" centered v-slot="props">
        {{ props.row.id }}
      </b-table-column>

      <b-table-column
        field="nev"
        label="Név"
        v-slot="props"
      >
        {{users.find(x => x.id === props.row.user_id).name}}
      </b-table-column>

      <b-table-column label="Idő" centered v-slot="props">
        <span class="tag is-success">
          {{ getCreated(props.row.created_at) }}
        </span>
    </b-table-column>

      <b-table-column label="Kapott pontok" centered numeric v-slot="props">
        <span>
          {{ props.row.pont }}
        </span>
      </b-table-column>

      <template slot="detail" slot-scope="props">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <div class="tile is-ancestor mb-2">
                <div class="tile is-vertical is-parent">
                  <div class="tile custom-pelda is-child box">
                    <p class="title">{{props.row.pont}}</p>
                    <p class="subtitle">Elért pontok száma</p>
                  </div>
                </div>
                <div class="tile is-vertical is-parent">
                  <div class="tile custom-pelda is-child box">
                    <p class="title">{{props.row.osszes_ido}}</p>
                    <p class="subtitle">Megoldási idő</p>
                  </div>
                </div>
              </div>
              <div class="tile is-ancestor">
                <div class="tile is-vertical">
                  <div class="tile side-tile">
                    <div class="tile is-parent is-vertical">
                      <article class="tile is-child notification is-light">
                        <p class="title">{{props.row.atlag_ido}}</p>
                        <p class="subtitle">Átlag megoldás</p>
                      </article>
                    </div>
                    <div class="tile is-parent">
                      <article class="tile is-child notification is-light">
                        <p class="title">{{props.row.gyors_ido}}</p>
                        <p class="subtitle">Leggyorsabb megoldás</p>
                      </article>
                    </div>
                    <div class="tile is-parent">
                      <article class="tile is-child notification is-light">
                        <p class="title">{{props.row.lassu_ido}}</p>
                        <p class="subtitle">Leglasabban megoldás</p>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
              <template>
                <b-table
                :data="props.row.lista"
                :sticky-header="props.row.lista.length > 7 ? true : false"
                ref="table"
                class="reszletes-tablazat"
                v-if="LoadedEredmenyek">
                  <b-table-column
                  class="reszletes-tablazat-sor"
                  label="Példa"
                  centered v-slot="lista">
                      {{ lista.row.szamok[0] }} {{ lista.row.mod}} {{ lista.row.szamok[1]}}
                  </b-table-column>

                  <b-table-column
                  class="reszletes-tablazat-sor"
                  label="Idő"
                  centered
                  v-slot="lista">
                      {{ lista.row.elteltido }}
                  </b-table-column>

                  <b-table-column
                  class="reszletes-tablazat-sor"
                  label="Pontok"
                  centered
                  numeric
                  v-slot="lista">
                      {{ lista.row.kapottpont }}
                  </b-table-column>
                </b-table>
              </template>
            </div>
          </div>
        </article>
      </template>
    </b-table>
    <b-skeleton height="30px" :active="!LoadedEredmenyek" :count="4"></b-skeleton>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  mounted() {
    this.initEredmenyek();
  },
  computed: {
    ...mapState('eredmenyek', ['eredmenyek', 'LoadedEredmenyek']),
    ...mapState('users', ['users']),
  },
  methods: {
    ...mapActions('eredmenyek', ['initEredmenyek']),
    getCreated(time) {
      function timeSince(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
          return `${interval} éve`;
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
          return `${interval} hónapja`;
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
          return `${interval} napja`;
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
          return `${interval} órája`;
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
          return `${interval} perce`;
        }
        return `${Math.floor(seconds)} másodperce`;
      }
      return timeSince(time.seconds * 1000) < 0
        ? 'éppen most'
        : `${timeSince(time.seconds * 1000)}`;
    },
  },
  data() {
    return {
      defaultOpenedDetails: [1],
      showDetailIcon: true,
    };
  },
};
</script>

<style lang="scss">

</style>
