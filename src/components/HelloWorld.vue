<template>
  <div class="hello" data-spma="aa" @click="eventAgent">
    <span>show spm:{{ spmText }}</span>
    <div data-spmb="bb">
      <button data-spmc="cc">Click it</button>
    </div>
    <div>
      <div data-spmb="dd">
        <button data-spmc="ff">Click it</button>
      </div>
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
    eventAgent(e) {
      const spmArr = Array.from({ length: 3 });
      const aCharCodeAt = 97;
      let el = e.target;
      while (el) {
        if (el.dataset) {
          const spmKey = Object.keys(el.dataset).find(
            key => key.slice(0, -1) === 'spm'
          );
          if (spmKey) {
            const index =
              spmKey.slice(-1).toLowerCase().charCodeAt() - aCharCodeAt;
            spmArr[index] = el.dataset[spmKey];
          }
        }
        el = el.parentElement;
      }
      if (spmArr.every(Boolean)) {
        this.spmText = spmArr.join('.');
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