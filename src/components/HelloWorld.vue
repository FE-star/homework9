<template>
  <div class="hello" data-spm="aa" @click="collectInfo">
    <span>show spm:{{ spmText }}</span>
    <div data-spm="bb">
      <button data-spm="cc">Click it</button>
    </div>
    <div data-spm="dd">
      <button data-spm="ff">Click it</button>
    </div>
  </div>
</template>

<script>
// TODO 利用事件代理实现一个简单的收集spm信息的方法，注意不是针对每一个按钮进行函数绑定。场景：
//考虑一下如果一个页面中有很多按钮，需要如何处理
export default {
  name: "HelloWorld",
  data: () => {
    return {
      spmText: "xx.xx.xx",
    };
  },
  methods: {
    collectInfo(e) {
      let result = "";
      let root = e.currentTarget;
      let temp = e.target;
      let rootSpm = root.dataset.spm;

      while (temp !== root) {
        if (temp && temp.dataset && temp.dataset.spm) {
          result = temp.dataset.spm + (result ? "." + result : result);
        }
        temp = temp.parentNode;
      }
      this.spmText = result ? rootSpm + "." + result : rootSpm;
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
