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
  methods: {
    findSpm(target, spmObj) {
      const data = target.dataset
      if (data && Object.keys(data)?.length) {
        Object.keys(data).map(key => {
          if (['spma', 'spmb', 'spmc'].includes(key) && !spmObj[key]) {
            spmObj[key] = data[key]
          }
        })
      }
      if (target.parentNode) {
        this.findSpm(target.parentNode, spmObj)
      }
      return spmObj['spma'] +`${spmObj['spmb'] && '.'}` + spmObj['spmb'] + `${spmObj['spmc'] && '.'}` + spmObj['spmc']
    },
    logClick(e) {
      const spmObj = {
        'spma': '',
        'spmb': '',
        'spmc': ''
      }
      const text = this.findSpm(e?.target, spmObj)
      if (text) {
        this.spmText = text
      }
    }
  },
  
  created: function() {
    document.body.addEventListener('click', this.logClick)
  },
  unmounted: function() {
    document.body.removeEventListener('click', this.logClick)
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
