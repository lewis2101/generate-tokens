<script setup lang="ts">
import Icon from "./styles/sprite/Icon.vue";
import {names} from "./styles/sprite/icon.sprite";
import { ColorBlack, ColorGreen } from './constants/index'

const colorIcon = ColorBlack

</script>

<template>
  <h1>ICONS: </h1>
<div :class="$style.container">
  <div :class="$style.icon" v-for="name in names" :key="name">
    <icon :color="colorIcon" size="3rem" :name="name"/>
  </div>
</div>
</template>

<style module lang="scss">
@use './styles/variables' as *;
@use './styles/mixins/breakpoints' as *;

.container {
  padding: 10px;
  background: white;
  display: flex;
  flex-wrap: wrap;
}
.icon {
  padding: 10px;
  border: 1px black solid;
}
.icon-svg {
  color: $color-black;
}


</style>