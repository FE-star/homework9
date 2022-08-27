<template>
  <div class="hello" data-spma="aa" @click="clickDivSpam">
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
      spmText: 'xx.xx.xx',
    }
  },
  /** 事件监听无法跑通用例
  mounted() {
    const helloNode = document.querySelector('.hello');
    if (!helloNode) return;
    helloNode.addEventListener('click', (e) => {
      const arr = this.findMark(e.target);
      this.spmText = arr.reverse().join('.')
    })
  },
  beforeUnmount() {
  },
   */
  methods: {
    clickDivSpam(e) {
      const arr = this.findMark(e.target);
      this.spmText = arr.reverse().join('.')
    },
    findMark(target, res = []) {
      const attributes = target.dataset;
      if (!attributes) return res;
      for(let k in attributes) {
        if(k.startsWith('spm')) {
          res.push(attributes[k]);
        }
      }

      if (target.parentNode) {
        this.findMark(target.parentNode, res);
      }
      return res;
    },
  },
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
