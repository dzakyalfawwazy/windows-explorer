import { PrismaClient, Folder } from "@prisma/client";

const prisma = new PrismaClient();
export type FolderWithChildren = Folder & { children: FolderWithChildren[] };

export class FolderRepository {
  // Ambil semua folder
  static async getAllFolders() {
    // console.log(r);
    return prisma.folder.findMany({
      where: { parentId: null },
      include: {
        children: true, // Ambil sub-folder langsung
        files: true,
      },
    });
  }

  // Ambil sub-folder berdasarkan parentId
  static async getSubfolders(folderId: number) {
    return prisma.folder.findUnique({
      where: { id: folderId },
      include: {
        children: true, // Pastikan subfolder disertakan
        files: true, // Pastikan file juga disertakan
      },
    });
  }

  // Ambil folder dengan rekursi (nested tree)
  static async getFolderTree(
    parentId: number | null = null
  ): Promise<FolderWithChildren[]> {
    const folders = await prisma.folder.findMany({
      where: { parentId },
    });

    return await Promise.all(
      folders.map(async (folder) => ({
        ...folder,
        children: await FolderRepository.getFolderTree(folder.id),
      }))
    );
  }
}
