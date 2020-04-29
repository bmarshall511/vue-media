<template>
  <li class="media" :class="{ 'is-active': selected, watched: media.watched }">
    <div class="media__teaser">
      <div class="media__poster">
        <img @click="select" :src="media.poster" class="media__img" />
        <div class="media__watched" v-if="media.watched">
          {{ media.watched }}<span>/5</span>
        </div>
        <div class="media__imdb-rating">
          <img src="@/assets/imdb-logo.svg" alt="IMDb Rating" />
          {{ media.imdbRating }}<span>/10</span>
        </div>
        <div class="media__metascore">
          <img src="@/assets/metacritic-logo.svg" alt="Metacritic Rating" />
          {{ media.metascore }}
        </div>
      </div>
      <h3>{{ media.title }} ({{ media.released.getFullYear() }})</h3>
      <dl>
        <dt>Rating</dt>
        <dd>{{ media.mpaa }}</dd>
        <dt>Length</dt>
        <dd>{{ duration }}min</dd>
      </dl>
      <p>{{ media.excerpt }}</p>
      <ul class="categories">
        <li v-for="category in media.categories.keys()" :key="category">
          {{ media.categories[category] }}
        </li>
      </ul>
      <div class="media__buttons" v-if="selected">
        <a
          class="button yellow"
          :href="`https://www.imdb.com/title/` + media.imdb + `/`"
        >
          IMDb
        </a>
        <a
          class="button red"
          :href="`https://www.youtube.com/watch?v=` + media.youtube + `/`"
        >
          YouTube
        </a>
        <button class="button" @click="reset">Close</button>
      </div>
    </div>
    <div class="media__content" v-if="selected">
      <div>
        <iframe
          v-if="selected"
          :src="
            `https://www.youtube.com/embed/` + media.youtube + `?&autoplay=1`
          "
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "MediaListItem",
  props: {
    media: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean
    }
  },
  computed: {
    duration: function() {
      let h = Math.floor(this.media.duration / 60);
      let m = this.media.duration % 60;
      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;

      return `${h}:${m}`;
    }
  },
  methods: {
    select() {
      this.$emit("clicked", this.media.key);
    },
    reset() {
      this.$emit("clicked", false);
    }
  }
};
</script>

<style lang="scss" scoped>
iframe {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.media__poster {
  margin-bottom: 0.7em;
  position: relative;

  &::after {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));
    bottom: 0;
    content: "";
    pointer-events: none;
    height: 100px;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 1;
  }

  img {
    cursor: pointer;
  }
}

.media__watched,
.media__imdb-rating,
.media__metascore {
  position: absolute;
  z-index: 2;
}

.media__imdb-rating,
.media__metascore {
  bottom: var(--grid-spacing);
  font-size: 0.9em;
  font-weight: var(--weight-bold);
  line-height: 1;

  img {
    height: 1.5em;
    margin-top: -0.2em;
    vertical-align: middle;
    width: auto;
  }
}

.media__watched {
  color: var(--text-color);
  font-size: 4rem;
  font-weight: var(--weight-bold);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  span {
    font-size: 0.4em;
    font-weight: 100;
  }
}

.media__imdb-rating {
  left: var(--grid-spacing);

  span {
    font-size: 0.75em;
  }
}

.media__metascore {
  right: var(--grid-spacing);
}

.media__content {
  > div {
    &:first-child {
      overflow: hidden;
      padding-top: 56.25%;
      position: relative;
    }
  }
}

.media__buttons {
  display: flex;
  margin-left: calc(var(--grid-spacing) / 4 * -1);
  margin-right: calc(var(--grid-spacing) / 4 * -1);
  margin-top: var(--grid-spacing);

  .button {
    flex-grow: 1;
    margin-left: calc(var(--grid-spacing) / 4);
    margin-right: calc(var(--grid-spacing) / 4);
  }
}

.media {
  display: flex;
  font-size: 0.9em;
  margin-bottom: var(--grid-spacing);
  margin-left: calc(var(--grid-spacing) / 2);
  margin-right: calc(var(--grid-spacing) / 2);
  transition: all 0.3s;
  width: calc(100% / 2 - var(--grid-spacing));

  @include breakpoint(small) {
    width: calc(100% / 4 - var(--grid-spacing));
  }

  @include breakpoint(medium) {
    width: calc(100% / 7 - var(--grid-spacing));
  }

  &.is-active {
    background-color: var(--black);
    font-size: 1em;
    height: 100vh;
    left: 50%;
    margin: 0;
    padding: 1em;
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    z-index: 9;

    .media__teaser {
      width: 20%;
    }

    .media__content {
      max-width: 100%;
      padding-left: var(--grid-spacing);
      width: 80%;
    }
  }

  &.watched {
    .media__img {
      opacity: 0.3;
    }
  }
}

dl {
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  margin-bottom: 0.3em;
  margin-top: 0.8em;
}

dt {
  display: none;
}

h3 {
  font-size: 1.1em;
  font-weight: var(--weight-bold);
}

dd {
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  font-size: 0.9em;
  line-height: 1.1;
  margin-right: 0.5em;
  padding-right: 0.5em;

  &:last-child {
    border-right: 0;
    margin-right: 0;
    padding-right: 0;
  }
}

.categories {
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8em;
  font-weight: var(--weight-bold);
  line-height: 1;
  margin-left: -2px;
  margin-right: -2px;
  margin-top: 1em;

  li {
    background-color: rgba(255, 255, 255, 0.1);
    margin-bottom: 4px;
    margin-left: 2px;
    margin-right: 2px;
    padding: 0.7em 0.9em 0.45em 0.9em;
  }
}
</style>
