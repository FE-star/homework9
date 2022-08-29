<template>
  <div ref="rootCompRef" class="hello" data-spma="aa" >
    <span>show spm:{{spmText}}</span>
    <div data-spmb="bb" >
      <button data-spmc="cc" v-spmclick="handleClick">Click it</button>
    </div>
    <div data-spmb="dd">
      <button data-spmc="ff" v-spmclick="handleClick">Click it</button>
    </div>
  </div>
</template>

<script>

function getSPMFromObject(o) {
    if(!o) return;
    if(typeof o !== 'object') return;
        const reg = /^spm./;
        for(let key in o) {
            if(reg.test(key)){
                return o[key];
            }
        }
}

function gainAllParentNodeDataSet(el, fn= () =>{}) {
    const ary = [];
    let currentEl = el;
    while(currentEl) {
        let spmc = getSPMFromObject(currentEl?.dataset);
        if(spmc){
            ary.unshift(spmc);
        }
        currentEl = currentEl.parentNode;
    }
    fn(ary.join('.'));
}

const spmclick = {
    mounted: (el, binding) => {
        el.handler = gainAllParentNodeDataSet.bind(null, el, binding.value);
        el.addEventListener('click', el.handler)
    },
    unmounted: (el) => {
        el.removeEventListener('click', el.handler);
    }
}

// TODO 利用事件代理实现一个简单的收集spm信息的方法，注意不是针对每一个按钮进行函数绑定。场景：考虑一下如果一个页面中有很多按钮，需要如何处理
export default {
  name: 'HelloWorld',
  data: ()=>{
    return {
      spmText: 'xx.xx.xx'
    }
  },
  methods: {
    handleClick(spmText) {
        this.spmText = spmText
    },
  },
  directives: {
    spmclick // 自定义指令实现
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
