<template>
  <main class="application-root p-2">
    <ul>
      <InventoryItem
        :key="item.id"
        :item="item"
        v-for="item in inventoryTree"
      />
    </ul>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";

import { TREE } from "@/data/inventory-tree";
import { Item } from "@/types/item";
import InventoryItem from "@/components/inventory-item/InventoryItem.vue";

const calculateChildIssueCount = (children: Item[]): number => {
  return children.reduce((accumulator: number, item: Item) => {
    let childrenIssues = 0;

    if (item.childrenIssues && item.childrenIssues !== 0) {
      childrenIssues = item.childrenIssues;
    } else if (item.children?.length) {
      childrenIssues = calculateChildIssueCount(item.children);
      item.childrenIssues = childrenIssues;
    }

    accumulator += childrenIssues + item.discoveredIssues;

    return accumulator;
  }, 0);
};

export default defineComponent({
  name: "App",
  components: { InventoryItem },
  setup() {
    // State
    const inventoryTree: Ref<Item[]> = ref([]);

    // Lifecycle Hooks
    onMounted(() => {
      calculateChildIssueCount(TREE);
      inventoryTree.value = TREE;
    });

    return {
      inventoryTree,
    };
  },
});
</script>
