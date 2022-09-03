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
    document.addEventListener('click', (event) => { // 箭头函数
      if (event.target.nodeName !== 'BUTTON') {
        return
      }
      let eleDom = event.target
      this.spmText = ''
      while (eleDom) {
        Object.keys(eleDom.dataset).forEach((val) => {
          if(/^spm/.test(val)) {
            this.spmText += `.${eleDom.dataset[val]}`
          }
        })
        eleDom = eleDom.parentElement
      }
      if(this.eleDom !== '') {
        this.spmText = this.spmText.substring(1)
        this.spmText = this.spmText.split('').reverse().join('')
      }
    })
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
