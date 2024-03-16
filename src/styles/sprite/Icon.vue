<template>
  <svg role="img" :class="$style.icon">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<script setup lang="ts">
import { Names } from "./icon-interface.ts";
import SVG from './icon.sprite.svg?raw'
import {onMounted} from "vue";

const props = defineProps<{
  name: Names,
  color: string,
  size: string
}>()

const spriteId = 'icon-sprite'

const injectSprite = () => {
  const div = document.createElement('div')
  div.id = spriteId
  div.style.width = '0px'
  div.style.height = '0px'
  div.style.position = 'absolute'
  div.innerHTML = SVG

  document.body.append(div)

}
//@ts-ignore
if(!document.getElementById(spriteId)) {
  injectSprite()
}




</script>

<style lang="scss" module>
.icon {
  color: v-bind('props.color');
  width: v-bind('props.size');
  height: v-bind('props.size');
}
</style>