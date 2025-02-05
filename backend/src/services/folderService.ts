import { FolderRepository } from "../repositories/folderRepository";

export class FolderService {
  static async getAllFolders() {
    return await FolderRepository.getAllFolders();
  }

  static async getSubfolders(parentId: number) {
    return await FolderRepository.getSubfolders(parentId);
  }

  static async getFolderTree() {
    return await FolderRepository.getFolderTree();
  }
}
