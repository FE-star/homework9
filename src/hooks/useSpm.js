/* eslint-disable */
import { onMounted, ref } from 'vue';
import { Spm } from '../lib/spm';

export function useSpm() {
    const spmText = ref('');
    onMounted(() => {
        const spm = new Spm();
        spm.hooks.click.tap('spmTextPlugin', (reportInfo) => {
            spmText.value = reportInfo.spmId || '';
        })
    });
    return { spmText };
}