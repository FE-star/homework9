<template>
  <div class="hello" data-spma="aa" @click="click">
    <span>show spm:{{ spmText }}</span>
    <!-- 加了一层div，模拟非每层元素都有spm数据的场景 -->
    <div>
      <div data-spmb="bb">
        <button data-spmc="cc">Click it</button>
      </div>
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
        spmText: 'xx.xx.xx'
      }
    },
    methods: {
      // 由于在document.body上绑定事件无效，此处绑定在div.hello元素上
      click(event) {
        this.getSpmText(event.target, event.currentTarget)
      },
      // 不断向父级元素查找，直到查找到绑定事件的元素
      getSpmText(target, currentTarget, arr = []) {
        // 早点当前元素的spm
        const targetSpmText = this.findSpmText(target)

        // 如果有spm则存入数组
        if (targetSpmText) {
          arr.push(targetSpmText)
        }

        // 如果查找到绑定事件的元素，就将结果存储并退出循环
        if (target === currentTarget) {
          this.spmText = arr.reverse().join('.')
          return
        }

        this.getSpmText(target.parentNode, currentTarget, arr)
      },
      // 查找当前元素是否有data-spmx属性，并且其有值
      // 将data-spmx属性的值返回，无值返回''
      findSpmText(target) {
        const dataset = target.dataset
        const spmKey = Object.keys(dataset).find(key => key.startsWith('spm'))

        if (spmKey && dataset[spmKey]) {
          return dataset[spmKey]
        }

        return ''
      }
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
