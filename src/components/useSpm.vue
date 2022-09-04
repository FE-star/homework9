<script>
import { onMounted, onUnmounted, ref } from "vue";

export default function useSpm() {
  let spm = ref("");

  const addClickEvent = (e) => {
    spm.value = getSpmData(e.target).join(".");
  };

  const getCurrentSpm = (current) => {
    const ds = current.dataset;
    for (let key in ds) {
      if (key.startsWith("spm")) {
        return ds[key];
      }
    }
  };

  const getSpmData = (target) => {
    const spmList = [];
    let next = target;
    const rootEl = document.querySelector("#app");

    while (next && !next.isEqualNode(rootEl)) {
      const val = getCurrentSpm(next);
      if (val) spmList.unshift(val);
      next = next.parentNode;
    }

    return spmList;
  };

  // on mounted add event listener
  onMounted(() => {
    console.log("on mounted");
    window.addEventListener("click", addClickEvent);
  });

  // on unmounted remove event listener
  onUnmounted(() => {
    console.log("on unmounted");
    window.removeEventListener("click", addClickEvent);
  });

  return { spm };
}
</script>
