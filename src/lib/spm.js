/* eslint-disable */
import { SyncHook, SyncWaterfallHook } from 'tapable';
const SPM_LOCATION = ['spma', 'spmb', 'spmc', 'spmd'];
export const EVENT_TYPE = { click: 'click', expose: 'expose' };
// TODO 每一个按钮都监听，后续要codeing一个document全局事件监听版本
export class Spm {
    constructor(defaultEventType = EVENT_TYPE.click) {
        this.hooks = {
            click: new SyncHook(['reportInfo']),
            expose: new SyncHook()
        };
        this.spmNodeTree = [];
        this.defaultEventType = defaultEventType;
        this.initSpmTree();
        window.addEventListener('beforeunload', this.destorySpm);
    }
    /**
     * @description 筛选需要埋点的dom并构造树结构
     */
    initSpmTree() {
        this.spmNodeTree = this.findSpmNode(document, 0, null);
    }
    /**
     * @param {HTMLElement} range 搜索范围
     * @param {number} spmLocationIndex abcd位指针 
     * @param {any} parent 父节点
     * @returns 当前层次需要埋点上报的dom信息
     */
    findSpmNode(range, spmLocationIndex, parent) {
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
            layerNode.children = this.findSpmNode(layerNode.node, spmLocationIndex + 1, layerNode);
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
        if (spmClick) {
            // TODO
        } else if (spmExpose) {
            //TODO
        } else if (!spmClick && !spmExpose) {
            if (this.defaultEventType === EVENT_TYPE.click && spmInfo.children.length <= 0) {
                element.addEventListener('click', () => {
                    this.handleClick(spmInfo.nodeInfo);
                });
                return [EVENT_TYPE.click];
            }
            if (this.defaultEventType === EVENT_TYPE.expose) {
                //TODO
            }
        }
    }

    unsetEventReporter(element, nodeInfo) {

    }

    destorySpm() {

    }

    handleClick(nodeInfo) {
        const reportInfo = { spmId: nodeInfo.spmId };
        this.hooks.click.call(reportInfo);
    }

    handleExpose(nodeInfo) { }



}