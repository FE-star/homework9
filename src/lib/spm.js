/* eslint-disable */
import { SyncHook } from 'tapable';
const SPM_LOCATION = ['spma', 'spmb', 'spmc', 'spmd'];
export const EVENT_TYPE = { click: 'click', expose: 'expose' };
export class Spm {
    constructor(defaultEventType = EVENT_TYPE.click) {
        this.hooks = {
            click: new SyncHook(['reportInfo']),
            expose: new SyncHook(['reportInfo'])
        };
        this.spmNodeTree = [];
        this.defaultEventType = defaultEventType;
        this.initSpmTree();
        window.addEventListener('beforeunload', () => {
            this.destorySpm(this.spmNodeTree);
        });
    }
    /**
     * @description 筛选需要埋点的dom并构造树结构
     */
    initSpmTree() {
        this.spmNodeTree = this.generateSpmNodes(document, 0, null);
    }
    /**
     * @param {HTMLElement} range 搜索范围
     * @param {number} spmLocationIndex abcd位指针 
     * @param {any} parent 父节点
     * @returns 当前层次需要埋点上报的dom信息
     */
    generateSpmNodes(range, spmLocationIndex, parent) {
        const layerNodes = Array.from(
            range.querySelectorAll(`[data-${SPM_LOCATION[spmLocationIndex]}]`
            ) || [])
            .map(node => {
                let nodeInfo = {};
                Object.keys(node.dataset).filter(field => {
                    return field.indexOf('spm') !== -1;
                }).forEach(item => {
                    if (node.dataset.hasOwnProperty(item)) {
                        nodeInfo[item] = node.dataset[item];
                    }
                })
                nodeInfo.spmId = `${parent ? (parent.nodeInfo.spmId + '.') : ''}${nodeInfo[`${SPM_LOCATION[spmLocationIndex]}`]}`;
                const spmInfo = {
                    nodeInfo,
                    node,
                    children: [],
                    parent,
                };
                return spmInfo;
            });
        for (const layerNode of layerNodes) {
            layerNode.children = this.generateSpmNodes(layerNode.node, spmLocationIndex + 1, layerNode);
            layerNode.eventsToReport = this.setEventReporter(layerNode.node, layerNode);
        }
        return layerNodes;
    }
    /**
     * 
     * @param {HTMLElement} element 设置事件响应的dom
     * @param {any} spmInfo 对应dom中的spm信息
     */
    setEventReporter(element, spmInfo) {
        const { spmClick, spmExpose } = spmInfo.nodeInfo || {};
        const clickEventHandler = () => {
            this.handleClick(spmInfo.nodeInfo);
        };
        const setClickEventReporter = () => {
            element.addEventListener('click', clickEventHandler);
            return {
                [EVENT_TYPE.click]: clickEventHandler
            };
        }
        const exposeEventHandler = () => {
            this.handleExpose(spmInfo.nodeInfo);
        }
        const setExposeEventReporter = () => {
            // TODO 处理的有点难看，应该只用一个IntersectionObserver就可以了
            const io = new IntersectionObserver(exposeEventHandler, { root: document.body });
            io.observe(element);
            return {
                [EVENT_TYPE.expose]: io
            }
        }
        const eventObj = {};
        if ((!spmClick && !spmExpose) && spmInfo.children.length <= 0) {
            if (this.defaultEventType === EVENT_TYPE.click) {
                return setClickEventReporter();
            }
            if (this.defaultEventType === EVENT_TYPE.expose) {
                return setExposeEventReporter();
            }
        }
        if (spmExpose) {
            eventObj[EVENT_TYPE.expose] = setExposeEventReporter();
        }
        if (spmClick && spmInfo.children.length <= 0) {
            eventObj[EVENT_TYPE.click] = setClickEventReporter();
        }
        return eventObj;
    }

    unsetEventReporter(layerNode) {
        const { node = null, eventsToReport = {} } = layerNode;
        if (!node) {
            return;
        }
        Object.keys(eventsToReport).forEach(eventName => {
            if (eventName === EVENT_TYPE.click) {
                element.removeEventListener(eventName, eventsToReport[eventName]);
            }
            if (eventName === EVENT_TYPE.expose) {
                eventsToReport[eventName].disconnect();
            }
        })
    }

    destorySpm(spmNodeTree = []) {
        for (const node of spmNodeTree) {
            if (node.children.length <= 0) {
                this.unsetEventReporter(node);
            } else {
                this.destorySpm(node.children || []);
            }
        }
    }

    handleClick(nodeInfo) {
        const reportInfo = { spmId: nodeInfo.spmId };
        this.hooks.click.call(reportInfo);
    }

    handleExpose(nodeInfo) {
        const reportInfo = { spmId: nodeInfo.spmId };
        this.hooks.click.call(reportInfo);
    };
}