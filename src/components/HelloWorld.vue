<template>
  <div class="hello" data-spma="aa" @click="updateSpmText">
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
// TODO 利用事件代理实现一个简单的收集spm信息的方法，注意不是针对每一个按钮进行函数绑定。场景：考虑一下如果一个页面中有很多按钮，需要如何处理
export default {
  name: 'HelloWorld',
  data: () => {
    return {
      spmText: 'xx.xx.xx',
    };
  },
  methods: {
    updateSpmText(e) {
      const buttonNode = e.target;
      if (e.srcElement.nodeName !== 'BUTTON') return;
      const spma = this.getSpmValue('data-spma', buttonNode);
      const spmb = this.getSpmValue('data-spmb', buttonNode);
      const spmc = buttonNode.getAttribute('data-spmc');
      this.spmText = [spma, spmb, spmc].join('.');
    },
    getSpmValue(attributeName, buttonNode) {
      const nodeList = document.querySelectorAll('[' + attributeName + ']');
      if (nodeList.length > 0) {
        let index = -1;
        nodeList.forEach((node, i) => {
          if (node.contains(buttonNode)) {
            index = i;
          }
        });
        if (index > -1)
          return nodeList[index].getAttribute(attributeName) || '';
      }
      return '';
    },
  },
};
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
