<script setup>
import ScrollMenu from '@/components/ScrollMenu.vue'
import { ref } from 'vue'
const openAccordion = ref(0)
const toggleAccordion = (index) => {
  openAccordion.value = openAccordion.value === index ? 0 : index
}
</script>
<template>
  <main class="grid-cont">
    <div class="scroll-menu">
      <ScrollMenu />
    </div>
    <header class="header-box">
      <div class="imageBox">
        <img src="/gbguide/restaurants/restaurangheadernarrow.jpeg" class="headerImage" />
      </div>
      <div class="titleBox">
        <h1 class="title">Restauranger</h1>
      </div>
    </header>

    <div class="box1 box">
      <article
        :class="{ artBoxClosed: openAccordion !== 1, artBoxOpen: openAccordion === 1 }"
        v-show="openAccordion !== 1"
      >
        <div class="artImageBoxClosed">
          <img src="/gbguide/restaurants/bulot.jpeg" class="artImageClosed" />
        </div>
        <div class="artTitleBoxClosed">
          <h1 class="artTitleClosed">1. Bulot</h1>
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
          <img src="/gbguide/restaurants/bulot.jpeg" class="artImageOpen" />
        </div>
        <div class="artTitleBoxOpen">
          <h1 class="artTitleOpen">1. Bulot</h1>
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

    <div class="box2 box">
      <article
        :class="{ artBoxClosed: openAccordion !== 2, artBoxOpen: openAccordion === 2 }"
        v-show="openAccordion !== 2"
      >
        <div class="artImageBoxClosed">
          <img src="/gbguide/restaurants/fei.jpeg" class="artImageClosed" />
        </div>
        <div class="artTitleBoxClosed">
          <h1 class="artTitleClosed">2. Fei</h1>
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
          <img src="/gbguide/restaurants/fei.jpeg" class="artImageOpen" />
        </div>
        <div class="artTitleBoxOpen">
          <h1 class="artTitleOpen">2. Fei</h1>
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
    <div class="box3 box">
      <article
        :class="{ artBoxClosed: openAccordion !== 3, artBoxOpen: openAccordion === 3 }"
        v-show="openAccordion !== 3"
      >
        <div class="artImageBoxClosed">
          <img src="/gbguide/restaurants/norda.jpeg" class="artImageClosed" />
        </div>
        <div class="artTitleBoxClosed">
          <h1 class="artTitleClosed">3. Norda</h1>
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
          <img src="/gbguide/restaurants/norda.jpeg" class="artImageOpen" />
        </div>
        <div class="artTitleBoxOpen">
          <h1 class="artTitleOpen">3. Norda</h1>
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

    <div class="box4 box">
      <article
        :class="{ artBoxClosed: openAccordion !== 4, artBoxOpen: openAccordion === 4 }"
        v-show="openAccordion !== 4"
      >
        <div class="artImageBoxClosed">
          <img src="/gbguide/restaurants/fatima.jpeg" class="artImageClosed" />
        </div>
        <div class="artTitleBoxClosed">
          <h1 class="artTitleClosed">4. Fatima</h1>
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
          <img src="/gbguide/restaurants/fatima.jpeg" class="artImageOpen" />
        </div>
        <div class="artTitleBoxOpen">
          <h1 class="artTitleOpen">4. Fatima</h1>
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

    <div class="box5 box">
      <article
        :class="{ artBoxClosed: openAccordion !== 5, artBoxOpen: openAccordion === 5 }"
        v-show="openAccordion !== 5"
      >
        <div class="artImageBoxClosed">
          <img src="/gbguide/restaurants/vra.jpeg" class="artImageClosed" />
        </div>
        <div class="artTitleBoxClosed">
          <h1 class="artTitleClosed">5. VRÅ</h1>
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
          <img src="/gbguide/restaurants/vra.jpeg" class="artImageOpen" />
        </div>
        <div class="artTitleBoxOpen">
          <h1 class="artTitleOpen">5. VRÅ</h1>
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
.grid-cont {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-box {
  grid-area: header;
  position: relative;
  place-self: center;
  text-align: center;
}

.imageBox {
  background-color: #214f75;
  width: 100em;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1%;
}

.headerImage {
  display: block;
  width: 100%;
  max-width: 1000ch;
  opacity: 0.5;
}

.titleBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.title {
  font-size: 8em;
  font-family: 'Newsreader';
  color: white;
}

.box {
  width: 100%;
}

.artBoxClosed {
  display: flex;
  flex-direction: row;
  align-items: start;
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
  margin-left: 40em;
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
  display: flex;
  flex-direction: row;
  align-items: start;
  background-color: #214f75;
  color: white;
  margin: 1em;
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

@media screen and (min-width: 200px) and (max-width: 1000px) {
  .title {
    font-size: 5em;
  }

  .imageBox {
    background-color: #214f75;
    width: 98%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1%;
  }

  .headerImage {
    margin-bottom: 1em;
  }
  .box {
    background-color: #e8f3fd;
  }
  .artBoxClosed {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 0;
    margin: 0;
  }

  .artImageClosed {
    width: 100%;
    border: none;
    margin: 0;
  }

  .artTitleBoxClosed {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1em;
  }
  .artTitleClosed {
    margin-left: 0;
  }

  .artTextClosed {
    margin-left: 1em;
  }

  .artButtonClosed {
    margin-left: 0;
    margin-top: 1em;
  }

  .artBoxOpen {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #214f75;
    border: none;
    border-radius: 0;
    margin: 0;
  }

  .artImageOpen {
    width: 100%;
    border: none;
    margin: 0;
  }

  .artTitleBoxOpen {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1em;
  }
  .artTitleOpen {
    margin-left: 1em;
  }

  .artTextOpen {
    margin-left: 1em;
  }
  .artButtonOpen {
    margin-left: 0;
    margin-top: 10em;
  }
}

@media screen and (min-width: 1000px) and (max-width: 1600px) {
  .artButtonClosed {
    margin-left: 25em;
    margin-top: 9em;
  }
}
</style>
