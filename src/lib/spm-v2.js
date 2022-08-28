/* eslint-disable */
import { SyncHook } from 'tapable';
const SPM_LOCATION = ['spma', 'spmb', 'spmc', 'spmd'];
export const EVENT_TYPE = { click: 'click' };

export class Spm_V2 {
    constructor() {
        this.hooks = {
            click: new SyncHook(['reportInfo'])
        };
        document.addEventListener('click', (event) => {
            console.log(event.target, event.target.dataset);
        });
    }
    clickHandler() {

    }
}