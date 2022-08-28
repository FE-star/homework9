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
    // 理论上相关代码都应该在单独的sdk js文件内部，但是由于测试用例demo期望结果在和vue的data数据对比，
    // 需要设置vue组件的data所以代码先放在了组件生命周期了

    function findSpmAttr(dataset = {}) {
      for(let key in dataset) {
        if (key.startsWith('spm')) {
          return key;
        }
      }
    }

    document.body.addEventListener('click', (e) => {
      let node = e.target;
      let spmAttr = findSpmAttr(node.dataset);

      if (node && spmAttr) {
        let logDataArr = [];
        logDataArr.unshift(node.dataset[spmAttr]);
        while (node && node.parentNode && node.parentNode.nodeName.toUpperCase() !== 'BODY') {
          node = node.parentNode;
          let dataset = node.dataset;
          spmAttr = findSpmAttr(dataset);
          if (spmAttr) {
            logDataArr.unshift(node.dataset[spmAttr]);
          }
        }

        this.spmText = logDataArr.join('.');
      }
    }, false)
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
