<template>
  <div class="hello" data-spma="aa" :onclick="getSPM">
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
    getSPM(e) {
      let target = e.target,
        spm = [];
      while (this.joinSPM(spm, target)) {
        target = target.parentNode;
      }
      this.spmText = spm.reverse().join('.');
    },
    joinSPM(spm, node) {
      const keys = Object.keys(node.dataset);
      const index = keys.findIndex((item) => item.startsWith('spm'));
      if (index !== -1) {
        spm.push(node.dataset[keys[index]]);
        if (node.parentNode) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
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
