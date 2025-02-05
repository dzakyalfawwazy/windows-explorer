import { Request, Response } from "express";
import { FolderService } from "../services/folderService";

export class FolderController {
  static async getAllFolders(req: Request, res: Response) {
    try {
      const folders = await FolderService.getAllFolders();
      res.json(folders);
    } catch (error) {
      res.status(500).json({ message: "Gagal mengambil semua folder" });
    }
  }

  static async getSubfolders(req: Request, res: Response) {
    try {
      const { parentId } = req.params;
      const subfolders = await FolderService.getSubfolders(Number(parentId));
      res.json(subfolders);
    } catch (error) {
      res.status(500).json({ message: "Gagal mengambil subfolder" });
    }
  }

  static async getFolderTree(req: Request, res: Response) {
    try {
      const tree = await FolderService.getFolderTree();
      res.json(tree);
    } catch (error) {
      res.status(500).json({ message: "Gagal mengambil struktur folder" });
    }
  }
}
