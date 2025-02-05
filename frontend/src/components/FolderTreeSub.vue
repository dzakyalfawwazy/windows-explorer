<script setup>
  import { defineProps, defineEmits, ref, reactive } from "vue";
  import { getSubfolders } from "../api/folderApi";
  import FolderTreeSub from "./FolderTreeSub.vue";

  const props = defineProps(["subfolder", "folderid"]);
  const emit = defineEmits(["selectedid"]);

  const isActive = ref(null);
  const folderChildren = reactive({}); // Simpan children berdasarkan folderId
  const isOpen = reactive({}); // Simpan state open/close berdasarkan folderId

  // Fetch children dari API saat folder diklik
  const fetchFoldersView = async (folderId) => {
    if (!folderId || folderChildren[folderId]) return; // Jika sudah di-fetch, skip

    try {
      const response = await getSubfolders(folderId);
      folderChildren[folderId] = response.data.children || []; // Simpan children

      // Loop untuk cek apakah ada subchildren, lalu fetch lagi
      for (const child of folderChildren[folderId]) {
        const subResponse = await getSubfolders(child.id);
        child.children = subResponse.data.children || []; // Tambahkan anak-anaknya
      }
    } catch (error) {
      console.error("Failed to load subfolders", error);
    }
  };

  const toggleFolder = async (folder) => {
    emit("selectedid", folder);
    isOpen[folder.id] = !isOpen[folder.id]; // Toggle show/hide subfolder

    if (isOpen[folder.id]) {
      await fetchFoldersView(folder.id); // Fetch data jika folder dibuka
    }
  };
</script>

<template>
  <ul>
    <li v-for="folder in subfolder" :key="folder.id">
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

      <!-- Subfolder dengan animasi transition -->
      <transition name="slide">
        <ul v-if="isOpen[folder.id]" class="ml-4 border-l pl-2">
          <FolderTreeSub
            :subfolder="folderChildren[folder.id]"
            @selectedid="emit('selectedid', $event)"
          />
        </ul>
      </transition>
    </li>
  </ul>
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
