<template>
  <div>
    <label>
      Series
      <select @change="selectSeries" v-model="componentSeries" multiple>
        <option v-for="seriesKey in series.keys()" :key="seriesKey">
          {{ series[seriesKey] }}
        </option>
      </select>
    </label>
    <label v-if="!componentSeries.length">
      Sort by
      <select @change="selectSortBy" v-model="componentSortBy">
        <option value="duration">Duration</option>
        <option value="imdbRating">IMBd Rating</option>
        <option value="metascore">Metascore</option>
        <option value="mpaa">MPAA</option>
        <option value="title">Title</option>
      </select>
    </label>
    <label v-if="!componentSeries.length">
      MPAA
      <select @change="selectMPAA" v-model="componentMPAAs" multiple>
        <option v-for="mpaaKey in mpaas.keys()" :key="mpaaKey">
          {{ mpaas[mpaaKey] }}
        </option>
      </select>
    </label>
    <label v-if="!componentSeries.length">
      Genre
      <select @change="selectCategory" v-model="componentCategories" multiple>
        <option v-for="categoryKey in categories.keys()" :key="categoryKey">
          {{ categories[categoryKey] }}
        </option>
      </select>
    </label>
    <label v-if="!componentSeries.length">
      Actors
      <select @change="selectActor" v-model="componentActors" multiple>
        <option v-for="actorKey in actors.keys()" :key="actorKey">
          {{ actors[actorKey] }}
        </option>
      </select>
    </label>
    <label v-if="!componentSeries.length">
      Directors
      <select @change="selectDirector" v-model="componentDirectors" multiple>
        <option v-for="directorKey in directors.keys()" :key="directorKey">
          {{ directors[directorKey] }}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: "MediaListFilter",
  props: {
    sortBy: {
      type: String,
      required: true
    },
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
    selectedCategories: {
      type: Array,
      required: true
    },
    selectedActors: {
      type: Array,
      required: true
    },
    selectedDirectors: {
      type: Array,
      required: true
    },
    selectedMPAAs: {
      type: Array,
      required: true
    },
    selectedSeries: {
      type: Array,
      required: true
    }
  },
  data: function() {
    return {
      componentSortBy: this.sortBy,
      componentCategories: this.selectedCategories,
      componentActors: this.selectedActors,
      componentDirectors: this.selectedDirectors,
      componentMPAAs: this.selectedMPAAs,
      componentSeries: this.selectedSeries
    };
  },
  methods: {
    selectSortBy: function() {
      this.$emit("sort-selected", this.componentSortBy);
    },
    selectCategory: function() {
      this.$emit("category-selected", this.componentCategories);
    },
    selectActor: function() {
      this.$emit("actors-selected", this.componentActors);
    },
    selectDirector: function() {
      this.$emit("directors-selected", this.componentDirectors);
    },
    selectMPAA: function() {
      this.$emit("mpaas-selected", this.componentMPAAs);
    },
    selectSeries: function() {
      this.$emit("series-selected", this.componentSeries);
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  margin-bottom: var(--grid-spacing);
  margin-top: var(--grid-spacing);
}

label {
  font-size: 0.8em;
  font-weight: var(--weight-bold);
  margin-right: var(--grid-spacing);

  &:last-child {
    margin-right: 0;
  }
}

select {
  display: block;
  font-size: 1rem;
}
</style>
