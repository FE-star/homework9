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

<script>
// TODO 利用事件代理实现一个简单的收集spm信息的方法，注意不是针对每一个按钮进行函数绑定。场景：考虑一下如果一个页面中有很多按钮，需要如何处理
export default {
  name: 'HelloWorld',
  data: ()=>{
    return {
      spmText: 'xx.xx.xx'
    }
  },
  mounted() {
    const findParent = (node) => {
      if (!node) return void 0
      const { parentNode } = node
      const attr = node.attributes
      const attrValues = attr && Object.values(attr)
      const spm = attrValues && attrValues.find(prop => prop.name.includes('data-spm'))
      return spm && ([spm.value].concat(findParent(parentNode)).filter(prop => prop))
    }
    const observerClickEvent = (evt) => {
      const ret = findParent(evt.target)
      this.spmText = ret.reverse().join('.')
    }
    document.addEventListener('click', observerClickEvent)
  }
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
