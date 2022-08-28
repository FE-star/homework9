import { shallowMount, mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

jest.setTimeout(10000)
describe('HelloWorld.vue', () => {
  it('校验第一个按钮的spm是否为aa.bb.cc', async () => {
    const wrapper = shallowMount(HelloWorld, { attachTo: document.body })
    const button = wrapper.findAll('button')
    await button[0].trigger('click')
    expect(wrapper.vm.spmText).toMatch('aa.bb.cc')
  })
})
describe('HelloWorld.vue', () => {
  it('校验第二个按钮的spm是否为aa.dd.ff', async () => {
    const wrapper = shallowMount(HelloWorld, { attachTo: document.body })
    const button = wrapper.findAll('button')
    await button[1].trigger('click')
    expect(wrapper.vm.spmText).toMatch('aa.dd.ff')
  })
})
describe('InnerButton.vue', () => {
  it('校验第三个按钮的spm是否为aa.dd.gg', async () => {
    const wrapper = mount(HelloWorld, { attachTo: document.body })
    const button = wrapper.findAll('button')

    // 触发InnerButton组件中button的click事件
    // HelloWorld组件能监听到变化，并同步修改spmText的值
    await button[2].trigger('click')
    expect(wrapper.vm.spmText).toMatch('aa.dd.gg')
  })
})
