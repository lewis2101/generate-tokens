<script setup lang="ts">

</script>

<template>
<div :class="$style.container">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, consequuntur dignissimos ea expedita iste labore laudantium nesciunt optio quae quis quisquam vel. Ad eius libero porro voluptatum. Consequatur consequuntur impedit minima porro provident quae quidem quod repellat ut voluptatibus. Accusamus aliquam asperiores blanditiis incidunt minima nemo quibusdam temporibus unde voluptates?
</div>
</template>

<style module lang="scss">
@use './styles/variables' as *;
@use './styles/mixins/breakpoints' as *;

.container {
  border: 1px $color-black solid;
  height: 100px;
  @include breakpoint_up('lg') {
    background: pink;
  }
  @include breakpoint_up('md') {
    background: green;
  }
  @include breakpoint_up('sm') {
    background: purple;
  }

}



</style>