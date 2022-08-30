/* eslint-disable */
import { SyncHook } from 'tapable';
const SPM_LOCATION = ['spma', 'spmb', 'spmc', 'spmd'];
export const EVENT_TYPE = { click: 'click', expose: 'expose' };

export class Spm_V2 {
    constructor() {
        this.hooks = {
            click: new SyncHook(['reportInfo']),
            expose: new SyncHook(['reportInfo'])
        };
        document.addEventListener('click', this.clickHandler.bind(this));
        window.addEventListener('beforeunload', () => {
            this.io.disconnect();
            document.removeEventListener('click', this.clickHandler);
        });
        this.initExpose();
    }
    clickHandler(event) {
        const element = event.target;
        if (this.isValidSpmNode(element)) {
            const spmId = this.generateSpmId(element);
            this.hooks.click.call({ spmId });
        }
    }
    initExpose() {
        this.io = new IntersectionObserver(this.exposeHandler.bind(this), { root: document.body })
        const exposeEleArr = Array.from(document.querySelectorAll('[data-spm-expose]'));
        exposeEleArr.forEach(ele => {
            this.io.observe(ele);
        });
    }
    exposeHandler(entries = []) {
        entries.forEach(entry => {
            const element = entry.target;
            if (this.isValidSpmNode(element)) {
                const spmId = this.generateSpmId(element);
                this.hooks.expose.call({ spmId });
            }
        })
    }
    generateSpmId(element) {
        let ids = Array.from({ length: 4 });
        let curEle = element;
        const isEmpty = (obj) => {
            return Object.keys(obj).length === 0;
        }
        const findSpmPath = (spmLocationIndex) => {
            if (spmLocationIndex < 0) {
                return;
            }
            while (curEle !== document.body.parentElement) {
                const spmInfo = this.filterSpmInfo(curEle);
                if (!isEmpty(spmInfo)) {
                    break;
                }
                curEle = curEle.parentElement;
            }
            if (curEle === document.body.parentElement) {
                return;
            }
            const spm = this.filterSpmInfo(curEle);
            const spmLocation = spm[SPM_LOCATION[spmLocationIndex]];
            if (!spmLocation) {
                findSpmPath(spmLocationIndex - 1);
            } else {
                ids[spmLocationIndex] = spmLocation;
                curEle = curEle.parentElement;
                findSpmPath(spmLocationIndex - 1);
            }
        }
        findSpmPath(3);
        return this.isValidSpmInfo(ids) ? ids.filter(item => item).join('.') : '';
    }
    isValidSpmNode(element) {
        const { spmc, spmd, spmExpose } = this.filterSpmInfo(element);
        return spmd || spmc || spmExpose;
    }
    isValidSpmInfo(ids = []) {
        if (ids.length <= 0) {
            return false;
        }
        if (!ids[0] || !ids[1]) {
            return false;
        }
        return true;
    }
    filterSpmInfo(element) {
        const spmInfo = {};
        Object.keys(element.dataset).filter(item => {
            return item.indexOf('spm') !== -1;
        }).forEach(item => {
            spmInfo[item] = element.dataset[item];
        });
        return spmInfo;
    }

}