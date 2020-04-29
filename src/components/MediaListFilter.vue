<template>
  <form>
    <label>
      Search
      <input type="text" v-model="textSearch" />
    </label>
    <label>
      Series
      <select v-model="selectedSeries" multiple>
        <option v-for="seriesKey in series.keys()" :key="seriesKey">
          {{ series[seriesKey] }}
        </option>
      </select>
    </label>
    <label>
      MPAA
      <select v-model="selectedMPAAs" multiple>
        <option v-for="mpaaKey in mpaas.keys()" :key="mpaaKey">
          {{ mpaas[mpaaKey] }}
        </option>
      </select>
    </label>
    <label>
      Genre
      <select v-model="selectedCategories" multiple>
        <option v-for="categoryKey in categories.keys()" :key="categoryKey">
          {{ categories[categoryKey] }}
        </option>
      </select>
    </label>
    <label>
      Actors
      <select v-model="selectedActors" multiple>
        <option v-for="actorKey in actors.keys()" :key="actorKey">
          {{ actors[actorKey] }}
        </option>
      </select>
    </label>
    <label>
      Directors
      <select v-model="selectedDirectors" multiple>
        <option v-for="directorKey in directors.keys()" :key="directorKey">
          {{ directors[directorKey] }}
        </option>
      </select>
    </label>
    <div class="filter">
      <label>
        Sort by
        <select v-model="selectedSorting">
          <option value="released">Date Released</option>
          <option value="duration">Duration</option>
          <option value="imdbRating">IMBd Rating</option>
          <option value="watched">Marshall Rating</option>
          <option value="metascore">Metascore</option>
          <option value="mpaa">MPAA</option>
          <option value="title">Title</option>
        </select>
      </label>

      <button type="reset" class="button" @click="resetFilters">
        Reset Filters
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "MediaListFilter",
  props: {
    categories: {
      type: Array,
      required: true
    },
    actors: {
      type: Array,
      required: true
    },
    directors: {
      type: Array,
      required: true
    },
    mpaas: {
      type: Array,
      required: true
    },
    series: {
      type: Array,
      required: true
    },
    defaultCategories: {
      type: Array,
      required: true
    },
    defaultActors: {
      type: Array,
      required: true
    },
    defaultDirectors: {
      type: Array,
      required: true
    },
    defaultMPAAs: {
      type: Array,
      required: true
    },
    defaultSeries: {
      type: Array,
      required: true
    },
    defaultSorting: {
      type: String,
      required: true
    },
    defaultSearch: {
      type: String,
      required: false
    }
  },
  computed: {
    textSearch: {
      get() {
        return this.defaultSearch;
      },
      set(value) {
        this.$emit("search-query", value);
      }
    },
    selectedCategories: {
      get() {
        return this.defaultCategories;
      },
      set(value) {
        this.$emit("category-selected", value);
      }
    },
    selectedSeries: {
      get() {
        return this.defaultSeries;
      },
      set(value) {
        this.$emit("series-selected", value);
      }
    },
    selectedActors: {
      get() {
        return this.defaultActors;
      },
      set(value) {
        this.$emit("actors-selected", value);
      }
    },
    selectedDirectors: {
      get() {
        return this.defaultDirectors;
      },
      set(value) {
        this.$emit("directors-selected", value);
      }
    },
    selectedSorting: {
      get() {
        return this.defaultSorting;
      },
      set(value) {
        this.$emit("sort-selected", value);
      }
    },
    selectedMPAAs: {
      get() {
        return this.defaultMPAAs;
      },
      set(value) {
        this.$emit("mpaas-selected", value);
      }
    }
  },
  methods: {
    resetFilters: function() {
      this.$emit("reset-filters");
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  align-items: flex-end;
  display: flex;
  margin-bottom: var(--grid-spacing);
  margin-top: var(--grid-spacing);
}

label,
.filter {
  font-weight: var(--weight-bold);
  margin-right: var(--grid-spacing);
  width: calc(100% / 7);

  &:last-child {
    margin-right: 0;
  }
}

label {
  font-size: 0.7em;
  letter-spacing: 1px;
  text-transform: uppercase;
}

select,
input {
  background-color: rgba(255, 255, 255, 0.05);
  border: 3px solid rgba(255, 255, 255, 0.07);
  border-radius: 0;
  color: var(--white);
  display: block;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 0.85rem;
  padding: 0.8em 1em;
  width: 100%;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
}

.button {
  font-size: 1em;
  margin-top: 1em;
  width: 100%;
}
</style>
