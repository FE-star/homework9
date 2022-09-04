<template>
  <div class="hello" data-spma="aa" @click="click">
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
  name: "HelloWorld",
  data: () => {
    return {
      spmText: "xx.xx.xx",
    };
  },
  methods: {
    isSpmNode(node) {
      for (let k in node.dataset) {
        if (k.indexOf("spm") != -1) {
          return k;
        }
      }
      return "";
    },

    loop(node, res) {
      if (node.nodeName == "BODY") return res;
      const k = this.isSpmNode(node);
      if (k) res.unshift(node.dataset[k]);
      return this.loop(node.parentNode, res);
    },
    click(e) {
      const k = this.isSpmNode(e.target);
      if (e.target.nodeName == "BUTTON" && k) {
        const res = this.loop(e.target, []);
        this.spmText = res.join(".");
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
