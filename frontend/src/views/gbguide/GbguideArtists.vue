<script setup>
import ScrollMenu from '@/components/ScrollMenu.vue'
import { ref } from 'vue'
const openAccordion = ref(0)
const toggleAccordion = (index) => {
  openAccordion.value = openAccordion.value === index ? 0 : index
  console.log('clicked')
}
</script>
<template>
  <ScrollMenu />
  <main>
    <header>
      <div class="imageBox">
        <img src="/gbguide/artists/artistsheadernarrow.jpeg" class="headerImage" />
      </div>
      <div class="titleBox">
        <h1 class="title">Artister</h1>
      </div>
    </header>

    <div class="box1">
      <article
        :class="{ artBoxClosed: openAccordion !== 1, artBoxOpen: openAccordion === 1 }"
        v-show="openAccordion !== 1"
      >
        <div class="artImageBoxClosed">
          <img src="/gbguide/artists/kapten.jpeg" class="artImageClosed" />
        </div>
        <div class="artTitleBoxClosed">
          <h1 class="artTitleClosed">1. Kapten Röd</h1>
          <div class="artTextBoxClosed">
            <p class="artTextClosed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div class="artButtonBoxClosed" @click="toggleAccordion(1)">
            <button class="artButtonClosed">
              <img src="/svgarrows/arrowdown.svg" class="downButtonClosed" />
            </button>
          </div>
        </div>
      </article>
      <article class="artBoxOpen" v-show="openAccordion === 1">
        <div class="artImageBoxOpen">
          <img src="/gbguide/artists/kapten.jpeg" class="artImageOpen" />
        </div>
        <div class="artTitleBoxOpen">
          <h1 class="artTitleOpen">1. Kapten Röd</h1>
          <div class="artTextBoxOpen">
            <p class="artTextOpen">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
              <br />
              <br />
              Quam viverra orci sagittis eu volutpat odio facilisis mauris. Sit amet facilisis magna
              etiam.
            </p>
          </div>
          <div class="artButtonBoxOpen" @click="toggleAccordion(1)">
            <button class="artButtonOpen">
              <img src="/svgarrows/arrowup.svg" class="upButtonOpen" />
            </button>
          </div>
        </div>
      </article>
    </div>

    <div class="box2">
      <article
        :class="{ artBoxClosed: openAccordion !== 2, artBoxOpen: openAccordion === 2 }"
        v-show="openAccordion !== 2"
      >
        <div class="artImageBoxClosed">
          <img src="/gbguide/artists/roffe.jpeg" class="artImageClosed" />
        </div>
        <div class="artTitleBoxClosed">
          <h1 class="artTitleClosed">2. Roffe Ruff</h1>
          <div class="artTextBoxClosed">
            <p class="artTextClosed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div class="artButtonBoxClosed" @click="toggleAccordion(2)">
            <button class="artButtonClosed">
              <img src="/svgarrows/arrowdown.svg" class="downButtonClosed" />
            </button>
          </div>
        </div>
      </article>
      <article class="artBoxOpen" v-show="openAccordion === 2">
        <div class="artImageBoxOpen">
          <img src="/gbguide/artists/roffe.jpeg" class="artImageOpen" />
        </div>
        <div class="artTitleBoxOpen">
          <h1 class="artTitleOpen">2. Roffe Ruff</h1>
          <div class="artTextBoxOpen">
            <p class="artTextOpen">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
              <br />
              <br />
              Quam viverra orci sagittis eu volutpat odio facilisis mauris. Sit amet facilisis magna
              etiam.
            </p>
          </div>
          <div class="artButtonBoxOpen" @click="toggleAccordion(2)">
            <button class="artButtonOpen">
              <img src="/svgarrows/arrowup.svg" class="upButtonOpen" />
            </button>
          </div>
        </div>
      </article>
    </div>

    <div class="box3">
      <article
        :class="{ artBoxClosed: openAccordion !== 3, artBoxOpen: openAccordion === 3 }"
        v-show="openAccordion !== 3"
      >
        <div class="artImageBoxClosed">
          <img src="/gbguide/artists/laleh.jpeg" class="artImageClosed" />
        </div>
        <div class="artTitleBoxClosed">
          <h1 class="artTitleClosed">3. Laleh</h1>
          <div class="artTextBoxClosed">
            <p class="artTextClosed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div class="artButtonBoxClosed" @click="toggleAccordion(3)">
            <button class="artButtonClosed">
              <img src="/svgarrows/arrowdown.svg" class="downButtonClosed" />
            </button>
          </div>
        </div>
      </article>
      <article class="artBoxOpen" v-show="openAccordion === 3">
        <div class="artImageBoxOpen">
          <img src="/gbguide/artists/laleh.jpeg" class="artImageOpen" />
        </div>
        <div class="artTitleBoxOpen">
          <h1 class="artTitleOpen">3. Laleh</h1>
          <div class="artTextBoxOpen">
            <p class="artTextOpen">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
              <br />
              <br />
              Quam viverra orci sagittis eu volutpat odio facilisis mauris. Sit amet facilisis magna
              etiam.
            </p>
          </div>
          <div class="artButtonBoxOpen" @click="toggleAccordion(3)">
            <button class="artButtonOpen">
              <img src="/svgarrows/arrowup.svg" class="upButtonOpen" />
            </button>
          </div>
        </div>
      </article>
    </div>
    <div class="box4">
      <article
        :class="{ artBoxClosed: openAccordion !== 4, artBoxOpen: openAccordion === 4 }"
        v-show="openAccordion !== 4"
      >
        <div class="artImageBoxClosed">
          <img src="/gbguide/artists/hakan.jpeg" class="artImageClosed" />
        </div>
        <div class="artTitleBoxClosed">
          <h1 class="artTitleClosed">4. Håkan Hellström</h1>
          <div class="artTextBoxClosed">
            <p class="artTextClosed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div class="artButtonBoxClosed" @click="toggleAccordion(4)">
            <button class="artButtonClosed">
              <img src="/svgarrows/arrowdown.svg" class="downButtonClosed" />
            </button>
          </div>
        </div>
      </article>
      <article class="artBoxOpen" v-show="openAccordion === 4">
        <div class="artImageBoxOpen">
          <img src="/gbguide/artists/hakan.jpeg" class="artImageOpen" />
        </div>
        <div class="artTitleBoxOpen">
          <h1 class="artTitleOpen">4. Håkan Hellström</h1>
          <div class="artTextBoxOpen">
            <p class="artTextOpen">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
              <br />
              <br />
              Quam viverra orci sagittis eu volutpat odio facilisis mauris. Sit amet facilisis magna
              etiam.
            </p>
          </div>
          <div class="artButtonBoxOpen" @click="toggleAccordion(4)">
            <button class="artButtonOpen">
              <img src="/svgarrows/arrowup.svg" class="upButtonOpen" />
            </button>
          </div>
        </div>
      </article>
    </div>

    <div class="box5">
      <article
        :class="{ artBoxClosed: openAccordion !== 5, artBoxOpen: openAccordion === 5 }"
        v-show="openAccordion !== 5"
      >
        <div class="artImageBoxClosed">
          <img src="/gbguide/artists/leila.jpeg" class="artImageClosed" />
        </div>
        <div class="artTitleBoxClosed">
          <h1 class="artTitleClosed">5. Leila K</h1>
          <div class="artTextBoxClosed">
            <p class="artTextClosed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div class="artButtonBoxClosed" @click="toggleAccordion(5)">
            <button class="artButtonClosed">
              <img src="/svgarrows/arrowdown.svg" class="downButtonClosed" />
            </button>
          </div>
        </div>
      </article>
      <article class="artBoxOpen" v-show="openAccordion === 5">
        <div class="artImageBoxOpen">
          <img src="/gbguide/artists/leila.jpeg" class="artImageOpen" />
        </div>
        <div class="artTitleBoxOpen">
          <h1 class="artTitleOpen">5. Leila K</h1>
          <div class="artTextBoxOpen">
            <p class="artTextOpen">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
              <br />
              <br />
              Quam viverra orci sagittis eu volutpat odio facilisis mauris. Sit amet facilisis magna
              etiam.
            </p>
          </div>
          <div class="artButtonBoxOpen" @click="toggleAccordion(5)">
            <button class="artButtonOpen">
              <img src="/svgarrows/arrowup.svg" class="upButtonOpen" />
            </button>
          </div>
        </div>
      </article>
    </div>
  </main>
</template>
<style scoped>
.imageBox {
  width: 97%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1%;
}

.titleBox {
  font-family: 'Newsreader';
  color: white;
  position: absolute;
  top: 42%;
  left: 9%;
}

.title {
  font-size: 8em;
  margin-bottom: 0;
}

.headerImage {
  display: block;
  width: 100%;
  height: 100%;
}

.artBoxClosed {
  display: grid;
  grid-template-columns: 20% 70%;
  background-color: #e8f3fd;
  color: #173a5a;
  margin: 2em;
  border: 3px solid #214f75;
  border-radius: 1em;
  font-family: 'Newsreader';
}

.artImageClosed {
  width: 18em;
  height: 18em;
  margin: 1em;
  border: 3px solid #214f75;
}

.artTitleClosed {
  font-size: 3em;
}

.artButtonClosed {
  background-color: transparent;
  border: none;
  margin-left: 44em;
  margin-top: 9em;
}

.artButtonClosed:active {
  transform: translateY(0.5em);
}

.downButtonClosed {
  width: 3em;
}

.downButtonClosed:hover {
  width: 3.5em;
}

.artBoxOpen {
  display: grid;
  grid-template-columns: 40% 60%;
  background-color: #214f75;
  color: white;
  margin: 2em;
  border: 3px solid #e8f3fd;
  border-radius: 1em;
  font-family: 'Newsreader';
}

.artImageOpen {
  width: 35em;
  height: 30em;
  margin: 1em;
  border: 3px solid #e8f3fd;
}

.artTitleOpen {
  font-size: 4em;
}

.artButtonOpen {
  background-color: transparent;
  border: none;
  margin-left: 15em;
  margin-top: 15em;
}

.artButtonOpen:active {
  transform: translateY(0.5em);
}

.downButtonOpen {
  width: 3em;
}

.downButtonOpen:hover {
  width: 3.5em;
}
</style>
