import { shallowMount, mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue';
import { warn } from 'vue';

jest.setTimeout(10000)
describe('HelloWorld.vue', () => {
  it('校验第一个按钮的spm是否为aa.bb.cc', (done) => {
    const wrapper = shallowMount(HelloWorld);
    const button = wrapper.findAll('button');
    button[0].trigger('click');
    new Promise(rs => {
      setTimeout(() => {
        rs(null);
      }, 1000);
    }).then(() => {
      expect(wrapper.vm.spmText).toMatch('1');
      done();
    })
  })
})
// describe('HelloWorld.vue', () => {
//   it('校验第一个按钮的spm是否为aa.dd.ff', () => {
//     const wrapper = shallowMount(HelloWorld)
//     const button = wrapper.findAll('button')
//     button[1].trigger('click')
//     expect(wrapper.vm.spmText).toMatch('aa.dd.ff')
//   })
// })