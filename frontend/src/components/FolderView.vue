<script setup>
  import { defineProps, defineEmits } from "vue";
  import { getAllFolders, getSubfolders } from "../api/folderApi";

  const props = defineProps(["folder"]);
  const emit = defineEmits(["select-infolder"]);

  const selectFolder = async (folder) => {
    const response = await getSubfolders(folder);
    emit("select-infolder", await response.data);
  };
</script>

<template>
  <div class="folder-view">
    <ul v-if="(folder?.children ?? []).length">
      <li
        v-for="sub in folder?.children ?? []"
        :key="sub.id"
        @click="selectFolder(sub.id)"
      >
        📁 {{ sub.name }}
      </li>
    </ul>

    <!-- Menampilkan file -->
    <ul v-if="folder?.files?.length">
      <li v-for="file in folder.files" :key="file.id">📄 {{ file.name }}</li>
    </ul>
  </div>
</template>

<style scoped>
  .folder-view {
    flex-grow: 1;
    padding: 10px;
    overflow-y: auto;
  }

  .clickable {
    cursor: pointer;
    color: blue;
  }

  .clickable:hover {
    text-decoration: underline;
  }
</style>
