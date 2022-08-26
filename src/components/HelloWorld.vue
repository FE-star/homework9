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

<script>
/* eslint-disable */
// TODO 利用事件代理实现一个简单的收集spm信息的方法，注意不是针对每一个按钮进行函数绑定。场景：考虑一下如果一个页面中有很多按钮，需要如何处理
import { useSpm } from '../hooks/useSpm';
export default {
  name: 'HelloWorld',
  data: () => {
    return {
      spmText: '1'
    }
  },
  setup() {
    const { spmText } = useSpm();
    return { reportText: spmText };
  },
  watch: {
    reportText(value) {
      this.spmText = value;
    }
  }
}
</script>
<!-- <script setup>
/* eslint-disable */
import { useSpm } from '../hooks/useSpm';
import { ref } from 'vue';
// const spmText1 = ref('123');
const { spmText } = useSpm();
</script> -->

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
