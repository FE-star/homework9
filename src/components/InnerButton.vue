<template>
  <div>
    <div>
      {{ spmText }}
    </div>
    <button id="innerButton" data-spmc="gg">Click it</button>
  </div>
</template>

<script>
  export default {
    name: 'inner-button'
  }
</script>

<script setup>
  import { ref } from 'vue'
  import { addHook } from '../utils/spm'

  const spmText = ref('xx.xx.xx')
  addHook(spm => {
    spmText.value = spm
  })
</script>
