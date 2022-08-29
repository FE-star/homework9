/* eslint-disable */
import { SyncHook } from 'tapable';
const SPM_LOCATION = ['spma', 'spmb', 'spmc', 'spmd'];
export const EVENT_TYPE = { click: 'click' };

export class Spm_V2 {
    constructor() {
        this.hooks = {
            click: new SyncHook(['reportInfo']),
            expose: new SyncHook(['reportInfo'])
        };
        document.addEventListener('click', this.clickHandler);
        this.io = new IntersectionObserver(() => { }, { root: document.body })
        window.addEventListener('beforeunload', () => {
            this.io.disconnect();
            document.removeEventListener('click', () => { });
        })
    }
    clickHandler(event) {
        console.log(event);
    }
    exposeHandler() {

    }
    generateSpmPath(element) { };
}