import { shallowMount, mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue';
import { warn } from 'vue';

jest.setTimeout(10000)
describe('HelloWorld.vue', () => {
  it('校验第一个按钮的spm是否为aa.bb.cc', async () => {
    const wrapper = shallowMount(HelloWorld, { attachTo: document.body });
    const button = wrapper.findAll('button');
    await button[0].trigger('click');
    expect(wrapper.vm.spmText).toMatch('aa.bb.cc');
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