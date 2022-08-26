<template>
  <div class="hello" data-spma="aa">
    <span>show spm:{{spmText}}</span>
    <div data-spmb="bb">
      <button data-spmc="cc">Click it</button>
    </div>
    <div data-spmb="dd">
      <button data-spmc="ff">Click it</button>
    </div>
  </div>
</template>

<script setup>
import useSPM from "@/components/useSPM";
import {computed} from "vue";

const spm = useSPM()
const spmText = computed(() => spm.value.join('.'))
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
