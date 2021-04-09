<template>
  <li class="list-none leading-5 mb-2" :class="{ 'ml-8': !hasChildren }">
    <button
      class="w-3 mr-1 focus:outline-none"
      @click="toggleChildren"
      v-if="hasChildren"
    >
      {{ showChildren ? "-" : "+" }}
    </button>
    <span
      class="mr-1 text-sm"
      :class="{ 'cursor-pointer': hasChildren }"
      @click="toggleChildren"
      >{{ item.name }}</span
    >
    <span class="bg-red text-white text-sm rounded-md px-1">{{
      item.discoveredIssues
    }}</span>
    <span class="text-red text-sm ml-1">{{ item.childrenIssues }}</span>

    <ul v-if="hasChildren && showChildren" class="mt-2">
      <InventoryItem
        class="ml-4"
        v-for="child in children"
        :key="child.id"
        :item="child"
      />
    </ul>
  </li>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref, Ref } from "vue";

import { Item } from "@/types/item";

export default defineComponent({
  name: "InventoryItem",
  props: {
    item: {
      type: Object as () => Item,
      required: true,
    },
  },
  setup(props: { item: Item }) {
    // State
    const showChildren: Ref<boolean> = ref(false);

    // Computed
    const hasChildren: ComputedRef<boolean> = computed(() => {
      return !!props.item.children?.length;
    });
    const children: ComputedRef<Item[]> = computed(() => {
      const { children } = props.item;

      return hasChildren.value
        ? children?.sort((itemA: Item, itemB: Item) => {
            let orderModifier = 0;
            if (itemA.children?.length && itemB.children?.length) {
              orderModifier = itemA.name > itemB.name ? -1 : 1;
            } else if (itemA.children?.length) {
              orderModifier = -1;
            }

            return orderModifier;
          }) ?? []
        : [];
    });

    // Methods
    const toggleChildren = (): void => {
      if (hasChildren.value) {
        showChildren.value = !showChildren.value;
      }
    };

    return {
      showChildren,
      hasChildren,
      children,
      toggleChildren,
    };
  },
});
</script>
