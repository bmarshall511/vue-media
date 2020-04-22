<template>
  <div>
    <MediaListFilter
      :categories="sortedCategories"
      :actors="sortedActors"
      :directors="sortedDirectors"
      :mpaas="sortedMPAAs"
      :series="sortedSeries"
      :defaultCategories="selectedCategories"
      :defaultActors="selectedActors"
      :defaultDirectors="selectedDirectors"
      :defaultMPAAs="selectedMPAAs"
      :defaultSeries="selectedSeries"
      :defaultSorting="selectedSorting"
      @sort-selected="sortSelected"
      @category-selected="categoriesSelected"
      @actors-selected="actorSelected"
      @directors-selected="directorSelected"
      @mpaas-selected="mpaaSelected"
      @series-selected="seriesSelected"
      @reset-filters="resetFilters"
    />
    <ul>
      <MediaListItem
        v-for="media in sortedMedia"
        :key="media.key"
        :media="media"
        :selected="selected === media.key"
        @clicked="clicked"
      />
    </ul>
  </div>
</template>

<script>
import MediaListItem from "./MediaListItem.vue";
import MediaListFilter from "./MediaListFilter.vue";

export default {
  name: "MediaList",
  components: {
    MediaListItem,
    MediaListFilter
  },
  data: function() {
    return {
      mediaItems: [],
      selected: false,
      selectedCategories: [],
      selectedActors: [],
      selectedDirectors: [],
      selectedMPAAs: [],
      selectedSeries: [],
      selectedSorting: "title"
    };
  },
  methods: {
    sortSelected: function(sortBy) {
      this.selectedSorting = sortBy;
    },
    categoriesSelected: function(categories) {
      this.selectedCategories = categories;
    },
    actorSelected: function(actors) {
      this.selectedActors = actors;
    },
    directorSelected: function(directors) {
      this.selectedDirectors = directors;
    },
    mpaaSelected: function(mpaas) {
      this.selectedMPAAs = mpaas;
    },
    seriesSelected: function(series) {
      this.selectedSeries = series;
    },
    clicked: function(mediaID) {
      this.selected = mediaID;
    },
    resetFilters: function() {
      this.selectedSorting = "title";
      this.selectedCategories = [];
      this.selectedActors = [];
      this.selectedDirectors = [];
      this.selectedMPAAs = [];
      this.selectedSeries = [];
    },
    fetchMedia: function() {
      const GoogleSpreadsheetCode =
        "159ArspO_0OYerThEPuQqTkwBZlU-fuKSr-znFqRpwdw";
      const GoogleSpreadsheetPage = 1;

      let GoogleSpreasheetURL =
        "https://spreadsheets.google.com/feeds/cells/GSHEETCODE/GSHEETNUM/public/full?alt=json";
      GoogleSpreasheetURL = GoogleSpreasheetURL.replace(
        "GSHEETCODE",
        GoogleSpreadsheetCode
      ).replace("GSHEETNUM", GoogleSpreadsheetPage);

      let self = this;

      fetch(GoogleSpreasheetURL)
        .then(response => {
          return response.json();
        })
        .then(data => {
          self.mediaItems = self.doData(data);
        });
    },
    doData: function(data) {
      // Final results will be stored here
      var results = [];

      // Get all entries from spreadsheet
      var entries = data.feed.entry;

      // Set initial previous row, so we can check if the data in the current cell is from a new row
      var previousRow = 0;

      // Iterate all entries in the spreadsheet
      for (var i = 0; i < entries.length; i++) {
        // check what was the latest row we added to our result array, then load it to local variable
        var latestRow = results[results.length - 1];

        // get current cell
        var cell = entries[i];

        // get text from current cell
        var text = cell.content.$t;

        // get the current row
        var row = cell.gs$cell.row;

        // Determine if the current cell is in the latestRow or is a new row
        if (row > previousRow) {
          // this is a new row, create new array for this row
          var newRow = [];

          // add the cell text to this new row array
          newRow.push(text);

          // store the new row array in the final results array
          results.push(newRow);

          // Increment the previous row, since we added a new row to the final results array
          previousRow++;
        } else {
          // This cell is in an existing row we already added to the results array, add text to this existing row
          latestRow.push(text);
        }
      }

      return results;
    }
  },
  created: function() {
    this.fetchMedia();
  },
  computed: {
    sortedCategories: function() {
      let items = [...this.parsedMedia],
        categories = [];
      items.forEach(function(item) {
        categories = [...new Set([...categories, ...item.categories])];
      });

      return categories.sort();
    },
    sortedActors: function() {
      let items = [...this.parsedMedia],
        actors = [];
      items.forEach(function(item) {
        actors = [...new Set([...actors, ...item.actors])];
      });

      return actors.sort();
    },
    sortedDirectors: function() {
      let items = [...this.parsedMedia],
        directors = [];
      items.forEach(function(item) {
        directors = [...new Set([...directors, ...item.director])];
      });

      return directors.sort();
    },
    sortedMPAAs: function() {
      let items = [...this.parsedMedia],
        mpaas = [];
      items.forEach(function(item) {
        mpaas.push(item.mpaa);
      });

      return [...new Set(mpaas)].sort();
    },
    sortedSeries: function() {
      let items = [...this.parsedMedia],
        series = [];
      items.forEach(function(item) {
        if (item.series !== "N/A") {
          series.push(item.series);
        }
      });

      return [...new Set(series)].sort();
    },
    parsedMedia: function() {
      // Parse the media object
      let items = [...this.mediaItems];
      items.forEach(function(item, index) {
        items[index] = {
          key: index,
          title: item[0],
          released: new Date(item[1]),
          mpaa: item[2],
          categories: item[3].split(",").map(item => item.trim()),
          duration: parseInt(item[4]),
          excerpt: item[5],
          director: item[6].split(",").map(item => item.trim()),
          actors: item[7].split(",").map(item => item.trim()),
          poster: item[8],
          imdb: item[9],
          imdbRating: parseFloat(item[10]),
          imdbRatings: parseInt(item[11]),
          metascore: parseInt(item[12]),
          language: item[13],
          youtube: item[14],
          series: item[15],
          seriesNum: item[16]
        };
      });

      return items;
    },
    // Sorts the parsed media object.
    sortedMedia: function() {
      let items = [...this.parsedMedia];

      // Filter categories
      if (this.selectedCategories.length) {
        items = items.filter(item => {
          return item.categories.some(r => this.selectedCategories.includes(r));
        });
      }

      // Filter actors
      if (this.selectedActors.length) {
        items = items.filter(item => {
          return item.actors.some(r => this.selectedActors.includes(r));
        });
      }

      // Filter directors
      if (this.selectedDirectors.length) {
        items = items.filter(item => {
          return item.director.some(r => this.selectedDirectors.includes(r));
        });
      }

      // Filter MPAAs
      if (this.selectedMPAAs.length) {
        items = items.filter(item => {
          return this.selectedMPAAs.includes(item.mpaa);
        });
      }

      // Filter Series
      if (this.selectedSeries.length) {
        items = items.filter(item => {
          return this.selectedSeries.includes(item.series);
        });
      }

      // Sort results
      return items.sort((a, b) => {
        // Sort by IMDb ratings
        if (this.selectedSorting === "imdbRating") {
          if (a.imdbRating > b.imdbRating) {
            return -1;
          } else if (a.imdbRating === b.imdbRating) {
            if (a.imdbRatings > b.imdbRatings) {
              return -1;
            } else {
              return 1;
            }
          } else {
            return 1;
          }
        } else if (this.selectedSorting === "metascore") {
          // Sort my metascore
          if (a.metascore > b.metascore) {
            return -1;
          } else if (a.metascore === b.metascore) {
            if (a.imdbRatings > b.imdbRatings) {
              return -1;
            } else {
              return 1;
            }
          } else {
            return 1;
          }
        } else if (this.selectedSeries.length) {
          return a.seriesNum > b.seriesNum ? 1 : -1;
        } else {
          return a[this.selectedSorting] > b[this.selectedSorting] ? 1 : -1;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  margin-left: calc(var(--grid-spacing) / 2 * -1);
  margin-right: calc(var(--grid-spacing) / 2 * -1);
}
</style>
