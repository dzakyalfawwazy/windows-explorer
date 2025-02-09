<script setup>
  import { ref, onMounted, watch } from "vue";
  import FolderTree from "./FolderTree.vue";
  import FolderView from "./FolderView.vue";
  import { getAllFolders, getSubfolders } from "../api/folderApi";

  // State untuk menyimpan folder structure
  const folders = ref([]);
  const foldersview = ref([]);
  const folderid = ref([]);
  const selectedFolder = ref(null);

  // Fetch data dari backend
  const fetchFolders = async () => {
    try {
      const response = await getAllFolders(); // Sesuaikan dengan API backend
      folders.value = await response.data;
    } catch (error) {
      console.error("Failed to load folders", error);
    }
  };

  const fetchFoldersView = async (folderId) => {
    try {
      if (!folderId) {
        foldersview.value = []; // Jika tidak ada folder terpilih, kosongkan
        return;
      }
      const response = await getSubfolders(folderId);
      foldersview.value = response.data;
    } catch (error) {
      console.error("Failed to load folders", error);
    }
  };

  watch(selectedFolder, (newFolder) => {
    fetchFoldersView(newFolder.id);
  });

  const selectFolder = (folder) => {
    selectedFolder.value = folder;
    folderid.value = folder.id;
  };
  folderid.value = selectFolder ? selectFolder.id : null;

  onMounted(fetchFolders);
</script>

<template>
  <div class="mx-1 px-2 py-2 shadow-xl">
    <div
      class="col-span-3 w-[20vw] py-5 px-3 my-3 border-1 border-slate-200 rounded-xl shadow-md"
    >
      <div v-if="selectedFolder">📂 {{ selectedFolder.name }}</div>
      <div v-else>📂 {{ "Root" }}</div>
    </div>
    <div class="grid grid-cols-5 h-[80vh] border-1 px-3 py-1 rounded-md">
      <FolderTree
        :folderid="selectedFolder"
        :folders="folders"
        @selectedid="selectedFolder = $event"
        class="border-r border-slate-200 h-full overflow-y-auto max-h-[80vh]"
      />
      <FolderView
        :folder="foldersview"
        class="col-span-4 h-full overflow-y-auto max-h-[80vh]"
        @select-infolder="selectFolder"
      />
    </div>
  </div>
</template>

<style scoped></style>
