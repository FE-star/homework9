<template>
  <div
    class="hello"
    data-spma="aa"
    @click="clickHandle"
  >
    <span>show spm:{{spmText}}</span>
    <div
      v-for="spm in spms"
      :key="spm.spmb"
      :data-spmb="spm.spmb"
    >
      <button :data-spmc="spm.spmc">Click it</button>
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
      spms: [
        { spmb: "bb", spmc: "qq" },
        { spmb: "cc", spmc: "pp" },
        { spmb: "dd", spmc: "oo" },
        { spmb: "ee", spmc: "nn" },
        { spmb: "ff", spmc: "mm" },
        { spmb: "gg", spmc: "ll" },
        { spmb: "hh", spmc: "kk" },
        { spmb: "ii", spmc: "jj" },
      ],
    };
  },
  methods: {
    clickHandle(event) {
      const spmLevelArray = ["c", "b", "a"];
      let dom = event.target;
      if (dom.tagName !== "BUTTON") {
        return;
      }
      const spmArray = [];
      for (let i = 0; i < spmLevelArray.length; i++) {
        const key = spmLevelArray[i];
        spmArray.unshift(dom.dataset["spm" + key]);
        const spmLevel = spmLevelArray[i + 1];
        if (!spmLevel) {
          break;
        }
        dom = this.getParents(dom, spmLevel);
        if (!dom) {
          break;
        }
      }
      this.spmText = spmArray.join(".");
    },
    getParents(dom, spmLevel) {
      const parentElement = dom.parentElement;
      if (parentElement.tagName === "BODY") {
        return;
      }
      if (parentElement.dataset["spm" + spmLevel]) {
        return parentElement;
      }
      return this.getParents(parentElement, spmLevel);
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
