<script setup>
  import { ref, onMounted } from "vue";
  import { getAllFolders, getSubfolders } from "../api/folderApi";

  const folders = ref([]);
  const subfolders = ref([]);

  const loadFolders = async () => {
    try {
      const response = await getAllFolders();
      folders.value = response.data;
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  const loadSubfolders = async (folderId) => {
    try {
      const response = await getSubfolders(folderId);
      subfolders.value = response.data;
    } catch (error) {
      console.error("Error fetching subfolders:", error);
    }
  };

  onMounted(loadFolders);
</script>

<template>
  <div class="explorer">
    <div class="sidebar">
      <h3>Folders</h3>
      <ul>
        <li
          v-for="folder in folders"
          :key="folder.id"
          @click="loadSubfolders(folder.id)"
        >
          {{ folder.name }}
        </li>
      </ul>
    </div>
    <div class="content">
      <h3>Subfolders</h3>
      <ul>
        <li v-for="subfolder in subfolders" :key="subfolder.id">
          {{ subfolder.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .explorer {
    display: flex;
    width: 80%;
    height: 80%;
    background: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }

  .sidebar {
    width: 30%;
    background: #ddd;
    padding: 1rem;
  }

  .content {
    width: 70%;
    padding: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 5px;
    cursor: pointer;
  }

  li:hover {
    background: lightgray;
  }
</style>
