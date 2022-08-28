import { ref, onMounted, onBeforeUnmount } from "vue";
export function useSpm() {
  const spmText = ref("xx.xx.xx");
  const wrapperRef = ref();

  onMounted(() => {
    wrapperRef.value.addEventListener("click", handleSpmClick);
  });

  onBeforeUnmount(() => {
    wrapperRef.value.removeEventListener("click", handleSpmClick);
  });

  function handleSpmClick(e) {
    const target = e.target;
    spmText.value = getSpmText(target);
  }

  function getSpmText(dom) {
    const result = [];
    traverseDom(dom);
    return result.reverse().join(".");

    function traverseDom(dom) {
      if (dom.tagName.toLowerCase() === "body") {
        return;
      }

      if (dom.dataset) {
        const spmKey = Object.keys(dom.dataset).find((key) =>
          /^spm.*/.test(key)
        );
        if (spmKey) {
          result.push(dom.dataset[spmKey]);
        }
      }

      traverseDom(dom.parentNode);
    }
  }

  return {
    spmText,
    wrapperRef
  }
}
