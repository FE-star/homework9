import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue';

const observe = jest.fn((ele) => { return ele.dataset });
const unobserve = jest.fn();
window.IntersectionObserver = jest.fn((callback, options) => {
  window.exposeCallback = callback;
  return {
    observe,
    unobserve,
  };
})

describe('HelloWorld.vue', () => {
  it('校验第一个按钮的spm是否为aa.bb.cc', async () => {
    const wrapper = shallowMount(HelloWorld, { attachTo: document.body });
    const button = wrapper.findAll('button');
    await button[0].trigger('click');
    expect(wrapper.vm.spmText).toMatch('aa.bb.cc');
  })
})
describe('HelloWorld.vue', () => {
  it('校验第一个按钮的spm是否为aa.dd.ff', async () => {
    const wrapper = shallowMount(HelloWorld, { attachTo: document.body })
    const button = wrapper.findAll('button');
    await button[1].trigger('click');
    expect(wrapper.vm.spmText).toMatch('aa.dd.ff');
  })
})

describe('HelloWorld.vue', () => {
  it('粗糙的模拟一下曝光', () => {
    const wrapper = shallowMount(HelloWorld, { attachTo: document.body });
    expect(observe).toReturnWith(expect.objectContaining({ spmExpose: 'true', spmb: 'ee' }));
    window.exposeCallback();
    expect(wrapper.vm.spmText).toMatch('aa.ee');
  })
})
