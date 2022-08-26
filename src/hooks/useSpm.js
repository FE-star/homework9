/* eslint-disable */
import { onMounted, ref } from 'vue';
import { Spm } from '../lib/spm';

export function useSpm() {
    const spmText = ref('1');
    onMounted(() => {
        const spm = new Spm();
        spm.hooks.click.tap('spmTextPlugin', (reportInfo) => {
            spmText.value = reportInfo.spmId || '';
        })
    });
    return { spmText };
}