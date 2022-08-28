<template>
  <div class="hello" data-spma="aa">
    <span>show spm:{{ spmText }}</span>
    <!-- 加了一层div，模拟非每层元素都有spm数据的场景 -->
    <div>
      <div data-spmb="bb">
        <button data-spmc="cc">Click it</button>
      </div>
      <div id="inner" data-spmb="dd">
        <button data-spmc="ff">Click it</button>
        <InnerButton />
      </div>
    </div>
  </div>
</template>

<script>
  import { init, addHook, removeHook } from '../utils/spm'
  import InnerButton from './InnerButton.vue'

  // TODO 利用事件代理实现一个简单的收集spm信息的方法，注意不是针对每一个按钮进行函数绑定。场景：考虑一下如果一个页面中有很多按钮，需要如何处理
  export default {
    name: 'HelloWorld',
    components: {
      InnerButton
    },
    data: () => {
      return {
        spmText: 'xx.xx.xx'
      }
    },
    mounted () {
      const hook = (spmText) => {
        this.spmText = spmText
      }

      // 初始化信息收集，并传入hook进行数据处理
      // 建议在入口JS文件或入口组件进行初始化
      // 此处为通过用例，在组件中初始化
      init([
        hook
      ])

      // 可以移除hook，这样点击就无效
      setTimeout(() => {
        removeHook(hook)
      }, 3000);

      // 可以添加hook，让点击重新生效
      setTimeout(() => {
        addHook(hook)
      }, 5000);
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
