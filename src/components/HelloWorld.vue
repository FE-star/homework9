<template>
  <div class="hello" data-spma="aa" @click="clickDivHello($event)">
    <span>show spm:{{ spmText }}</span>
    <div data-spmb="bb">
      <button data-spmc="cc">Click it</button>
    </div>
    <div data-spmb="dd">
      <button data-spmc="ff">Click it</button>
    </div>
  </div>
</template>

<script>
// 利用事件代理实现一个简单的收集spm信息的方法，注意不是针对每一个按钮进行函数绑定。场景：考虑一下如果一个页面中有很多按钮，需要如何处理
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
  import { ref } from 'vue'
  const spmText = ref('xx.xx.xx')
  // let helloDiv = document.querySelector('hello')
  const clickDivHello = (event) => {
    let target = event.target || event.srcElement
    let s = ''
    const attribute = 'data-spm'
    const levels = ['c', 'b', 'a']
    let i = 0
    if ((target.nodeName.toLowerCase() === 'button') && (target.hasAttribute(attribute + levels[i]))) {
      s = target.getAttribute(attribute + levels[0])
      target = target.parentNode
      i++
      while (target &&  i < levels.length && target.hasAttribute(attribute + levels[i])) {
        s = `${target.getAttribute(attribute + levels[i])}.${s}`
        i++
        target = target.parentNode
      }
    }
    spmText.value = s
  }
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
