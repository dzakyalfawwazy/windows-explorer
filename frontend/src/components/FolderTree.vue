<script setup>
  import { defineProps, defineEmits, ref, watch, reactive } from "vue";
  import FolderTreeSub from "./FolderTreeSub.vue";

  const props = defineProps(["folders", "folderid"]);
  const emit = defineEmits(["selectedid"]);

  const isActive = ref(null);
  const isOpen = reactive({}); // State untuk menyimpan folder yang terbuka

  watch(
    () => props.folderid,
    (newFolder) => {
      isActive.value = newFolder?.id ?? null;
    },
    { immediate: true }
  );

  const toggleFolder = (folder) => {
    isOpen[folder.id] = !isOpen[folder.id]; // Toggle open/close folder
    emit("selectedid", folder);
  };
</script>

<template>
  <div class="folder-tree">
    <ul>
      <li v-for="folder in folders" :key="folder.id">
        <div
          @click.stop="toggleFolder(folder)"
          :class="[
            isActive === folder.id
              ? 'bg-slate-500 text-white font-semibold'
              : 'hover:bg-gray-100',
            'cursor-pointer flex items-center space-x-2 p-2',
          ]"
        >
          <span>{{ isOpen[folder.id] ? "📂" : "📁" }}</span>
          <span>{{ folder.name }}</span>
        </div>

        <!-- Subfolder hanya muncul jika folder terbuka -->
        <transition name="slide">
          <ul v-if="isOpen[folder.id]" class="ml-4 border-l pl-2">
            <FolderTreeSub
              :folderid="folderid"
              v-if="folder.children && folder.children.length"
              :subfolder="folder.children"
              :space="0"
              @selectedid="emit('selectedid', $event)"
            />
          </ul>
        </transition>
      </li>
    </ul>
  </div>
</template>

<style>
  /* Animasi show/hide */
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s ease-out;
  }
  .slide-enter-from,
  .slide-leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }
</style>
