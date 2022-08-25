import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('校验第一个按钮的spm是否为aa.bb.cc', () => {
    const wrapper = shallowMount(HelloWorld)
    const button = wrapper.findAll('button')
    button[0].trigger('click')
    expect(wrapper.vm.spmText).toMatch('aa.bb.cc')
  })
})
describe('HelloWorld.vue', () => {
  it('校验第一个按钮的spm是否为aa.dd.ff', () => {
    const wrapper = shallowMount(HelloWorld)
    const button = wrapper.findAll('button')
    button[1].trigger('click')
    expect(wrapper.vm.spmText).toMatch('aa.dd.ff')
  })
})
