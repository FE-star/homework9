import {onBeforeMount, onMounted, ref} from "vue";

export default function () {
    let registered = false;
    let smp = ref([]);

    function handleClick(event) {
        const target = event.target;
        const currentTarget = event.currentTarget;

        smp.value = handleSPM(target, currentTarget);
    }

    function handleSPM(target, currentTarget, arr = []) {
        let datasets = target.dataset;
        let hasSPM = false;

        for (let attr in datasets) {
            // 有且只能有一个？代码上不做处理了，实现成只处理遇到的第一个。
            if (attr.startsWith('spm')) {
                hasSPM = true;
                arr = [datasets[attr], ...arr]
                break;
            }
        }

        if (!hasSPM) {
            return arr;
        }

        if (target === currentTarget) {
            return arr;
        }

        const next = target.parentNode;
        if (next) {
            return handleSPM(next, currentTarget, arr);
        }
    }

    onMounted(() => {
        if (!registered) {
            window.addEventListener('click', handleClick)
            registered = true
        }
    })

    onBeforeMount(() => {
        if (registered) {
            window.removeEventListener('click', handleClick)
            registered = false
        }
    })

    return smp
}
