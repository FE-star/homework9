<template>
  <div class="hello" data-spma="aa">
    <span>show spm:{{ spmText }}</span>
    <div data-spmb="bb">
      <button data-spmc="cc">Click it</button>
    </div>
    <div data-spmb="dd">
      <button data-spmc="ff">Click it</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

let spmText = ref()

const getSpmKey = (dataset) =>
  dataset
    ? Object.keys(dataset)?.find((propName) => propName.startsWith('spm'))
    : undefined
const getEventFlowNodes = (event) =>
  event.path || (event.composedPath && event.composedPath()) || []
const getSpmValue = (spmNode) => spmNode.dataset[getSpmKey(spmNode.dataset)]
const isSpmNode = (node) => !!getSpmKey(node.dataset)
const isButton = (node) => node.nodeName === 'BUTTON'

const calculateSpmTextValue = (e) => {
  const eventNodes = getEventFlowNodes(e)
  if (isButton(e.target) && isSpmNode(e.target)) {
    spmText.value = eventNodes
      .filter(isSpmNode)
      .map(getSpmValue)
      .reverse()
      .join('.')
  }
}

onMounted(() => document.addEventListener('click', calculateSpmTextValue))
onUnmounted(() => document.removeEventListener('click', calculateSpmTextValue))
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