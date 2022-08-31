<template>
  <div class="hello" data-spma="aa" @click="delegateClickEvent">
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
    delegateClickEvent(e) {
      // eslint-disable-next-line
      // debugger;
      // console.log(e, e.target, e.currentTarget);

      if (!["BUTTON"].includes(e.target.tagName)) return;

      let currEle = e.target;
      const spm = [],
        endEle = e.currentTarget.parentElement;

      while (currEle !== endEle) {
        // 获取第一个spm属性名
        const spmProp = currEle
          .getAttributeNames()
          .find((attr) => attr.startsWith("data-spm"));
        // 获取spm属性值
        if (spmProp) {
          const spmValue = currEle.dataset[spmProp.replace("data-", "")];
          spm.unshift(spmValue);
        }
        currEle = currEle.parentElement;
      }

      this.spmText = spm.join(".");
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
