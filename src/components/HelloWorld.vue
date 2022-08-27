<template>
  <div class="hello" data-spma="aa">
    <span>show spm:<span id="spmText">{{ spmText }}</span></span>
    <div data-spmb="bb">
      <button data-spmc="cc" class="buttonA">Click it a</button>
    </div>
    <div data-spmb="dd">
      <button data-spmc="ff" class="buttonB">Click it b</button>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { useSpm } from '../hooks/useSpm';
const { spmText } = useSpm();
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
