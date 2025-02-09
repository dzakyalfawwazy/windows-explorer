<script setup>
  import { defineProps, defineEmits, ref, watch } from "vue";
  import {
    getAllFolders,
    getSubfolders,
    createFolder,
    deleteFolder,
    createFile,
    deleteFile,
  } from "../api/folderApi";

  const props = defineProps(["folder"]);
  const emit = defineEmits(["select-infolder"]);
  const statusDelete = ref(null);
  const statusDeleteFile = ref(null);
  const newFolderForm = ref(null);
  const newFileForm = ref(null);

  const newFolder = (val) => {
    newFolderForm.value = val;
  };

  const newFile = (val) => {
    newFileForm.value = val;
  };

  const isDelete = (val) => {
    statusDelete.value = val;
  };

  const isDeleteFile = (val) => {
    statusDeleteFile.value = val;
  };

  const form = ref({
    name: "",
    parentId: props.folder.id,
  });

  const submitform = async () => {
    try {
      // console.log(form.value);
      const response = await createFolder(form.value);

      selectFolder(props.folder?.id);
      if (response) {
        newFolderForm.value = "isClosed";
        form.name = "";
      }
    } catch (error) {
      console.log("Gagal Insert :", error);
    }
  };

  const submitformfile = async () => {
    try {
      const response = await createFile({
        name: form.value.name,
        extension: "",
        folderId: form.value.parentId,
      });

      selectFolder(props.folder?.id);
      if (response) {
        newFileForm.value = "isClosed";
        form.name = "";
      }
    } catch (error) {
      console.log("Gagal Insert :", error);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus folder ini?")) return;

    try {
      const response = await deleteFolder(id);
      newFolderForm.value = "isClosed";
      statusDelete.value = "isClosed";
      if (response) selectFolder(props.folder?.id);
    } catch (error) {
      console.error("Gagal menghapus folder:", error);
    }
  };
  const handleDeleteFile = async (id) => {
    if (!confirm("Yakin ingin menghapus File ini?")) return;

    try {
      const response = await deleteFile(id);
      newFileForm.value = "isClosed";
      statusDeleteFile.value = "isClosed";
      if (response) selectFolder(props.folder?.id);
    } catch (error) {
      console.error("Gagal menghapus File:", error);
    }
  };

  const selectFolder = async (folder) => {
    const response = await getSubfolders(folder);
    emit("select-infolder", await response.data);
  };
  watch(
    () => props.folder.id, // Memantau perubahan props.folder.id
    (newId) => {
      form.value.parentId = newId; // Update form.parentId ketika props berubah
    }
  );
</script>

<template>
  <div class="flex flex-col">
    <div class="px-3 py-1 flex gap-3">
      <!-- folder -->
      <div
        class="py-1 px-2 w-28 gap-2 items-center flex align-middle rounded-md shadow-md border-1 border-slate-300 cursor-pointer"
        @click="newFolder('isOpen')"
      >
        <div><i class="fas fa-plus-circle text-blue-500"></i></div>
        <div>Folder</div>
      </div>
      <div
        class="py-1 px-2 w-28 items-center gap-2 flex align-middle rounded-md shadow-md border-1 border-slate-300 cursor-pointer select-none"
        @click="isDelete('isOpen')"
        v-if="statusDelete !== 'isOpen'"
      >
        <div><i class="fas fa-trash text-blue-500"></i></div>
        <div>Folder</div>
      </div>
      <div
        class="py-1 px-2 w-64 gap-2 flex align-middle rounded-md shadow-md border-1 border-red-300 cursor-pointer select-none bg-red-500 text-white"
        @click="isDelete('isClosed')"
        v-if="statusDelete === 'isOpen'"
      >
        <div><i class="fas fa-close"></i></div>
        <div>Cancel Delete File</div>
      </div>
      <!-- File  -->
      <div
        class="py-1 px-2 w-28 gap-2 items-center flex align-middle rounded-md shadow-md border-1 border-slate-300 cursor-pointer"
        @click="newFile('isOpen')"
      >
        <div><i class="fas fa-plus-circle text-blue-500"></i></div>
        <div>File</div>
      </div>
      <div
        class="py-1 px-2 w-28 items-center gap-2 flex align-middle rounded-md shadow-md border-1 border-slate-300 cursor-pointer select-none"
        @click="isDeleteFile('isOpen')"
        v-if="statusDeleteFile !== 'isOpen'"
      >
        <div><i class="fas fa-trash text-blue-500"></i></div>
        <div>File</div>
      </div>
      <div
        class="py-1 px-2 w-64 gap-2 flex align-middle rounded-md shadow-md border-1 border-red-300 cursor-pointer select-none bg-red-500 text-white"
        @click="isDeleteFile('isClosed')"
        v-if="statusDeleteFile === 'isOpen'"
      >
        <div><i class="fas fa-close"></i></div>
        <div>Cancel Delete File</div>
      </div>
    </div>
    <div v-if="newFolderForm === 'isOpen'">
      <form
        @submit.prevent="submitform"
        class="flex flex-row align-middle gap-3 px-3"
      >
        <input
          v-model="form.name"
          id="name"
          placeholder="New Folder"
          required
          class="border-1 px-3 py-1 rounded-md border-slate-400"
        />
        <button class="text-green-400 align-middle">
          <i class="fas fa-check"></i>
        </button>
        <div
          class="cursor-pointer grid place-items-center py-2 rounded text-red-400"
          @click="newFolder('isClosed')"
        >
          <i class="fas fa-close"></i>
        </div>
      </form>
    </div>

    <div v-if="newFileForm === 'isOpen'">
      <form
        @submit.prevent="submitformfile"
        class="flex flex-row align-middle gap-3 px-3"
      >
        <input
          v-model="form.name"
          id="name"
          placeholder="New File"
          required
          class="border-1 px-3 py-1 rounded-md border-slate-400"
        />
        <button class="text-green-400 align-middle">
          <i class="fas fa-check"></i>
        </button>
        <div
          class="cursor-pointer grid place-items-center py-2 rounded text-red-400"
          @click="newFile('isClosed')"
        >
          <i class="fas fa-close"></i>
        </div>
      </form>
    </div>

    <div class="folder-view">
      <ul v-if="(folder?.children ?? []).length">
        <li
          v-for="sub in folder?.children ?? []"
          :key="sub.id"
          @click="statusDelete !== 'isOpen' ? selectFolder(sub.id) : ''"
        >
          <button
            @click="handleDeleteFile(sub.id)"
            v-if="statusDelete === 'isOpen'"
            class="text-red-500"
          >
            <i class="fas fa-trash"></i>
          </button>
          📁 {{ sub.name }}
        </li>
      </ul>

      <!-- Menampilkan file -->
      <ul v-if="folder?.files?.length">
        <li v-for="file in folder.files" :key="file.id">
          <button
            @click="handleDeleteFile(file.id)"
            v-if="statusDeleteFile === 'isOpen'"
            class="text-red-500"
          >
            <i class="fas fa-trash"></i>
          </button>

          📄 {{ file.name }}
        </li>
      </ul>
    </div>
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
