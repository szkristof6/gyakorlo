<template>
  <div>
    <div class="content">
      <template v-if="LoadedUser">
        <section>
          <b-table
            :data="users"
            :columns="columns"
            striped
          >
          </b-table>
        </section>
      </template>
      <b-skeleton height="30px" :active="!LoadedUser" :count="4"></b-skeleton>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState('users', ['users', 'LoadedUser']),
  data() {
    return {
      columns: [
        {
          field: 'name',
          label: 'Név',
        },
        {
          field: 'pont',
          label: 'Pont',
        },
      ],
      page: 1,
      perPage: 5,
    };
  },
};
</script>
