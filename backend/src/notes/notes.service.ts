import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, CreateNoteDto: CreateNoteDto) {
    const { tags, ...noteData } = CreateNoteDto;

    return this.prisma.note.create({
      data: {
        ...noteData,
        authorId: userId,

        tags:
          (tags?.length ?? 0 > 0)
            ? {
                connectOrCreate: tags?.map((tag) => ({
                  where: { name: tag },
                  create: { name: tag },
                })),
              }
            : undefined,
      },
      include: { tags: true },
    });
  }

  async findAll(userId: string) {
    return this.prisma.note.findMany({
      where: { authorId: userId, isActive: true },
      include: { tags: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findAllArchived(userId: string) {
    return this.prisma.note.findMany({
      where: { authorId: userId, isActive: false },
      include: { tags: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(userId: string, noteId: string) {
    const note = await this.prisma.note.findUnique({
      where: { id: noteId, authorId: userId },
      include: { tags: true },
    });

    if (!note) {
      throw new NotFoundException(`Nota con ID ${noteId} no encontrada`);
    }

    return note;
  }

  async update(userId: string, noteId: string, updateNoteDto: UpdateNoteDto) {
    await this.findOne(userId, noteId);

    const { tags, ...noteData } = updateNoteDto;

    return this.prisma.note.update({
      where: { id: noteId },
      data: {
        ...noteData,
        tags: tags
          ? {
              set: [],
              connectOrCreate: tags.map((tag) => ({
                where: { name: tag },
                create: { name: tag },
              })),
            }
          : undefined,
      },
      include: { tags: true },
    });
  }

  async remove(userId: string, noteId: string) {
    await this.findOne(userId, noteId);

    return this.prisma.note.delete({
      where: { id: noteId },
    });
  }
}
