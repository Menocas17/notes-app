import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthUser } from 'src/auth/types/auth-user.types';

@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(
    @Req() req: Request & { user: AuthUser },
    @Body() createNoteDto: CreateNoteDto,
  ) {
    return this.notesService.create(req.user.id, createNoteDto);
  }

  @Get()
  findAll(@Req() req: Request & { user: AuthUser }) {
    return this.notesService.findAll(req.user.id);
  }

  @Get('/archived')
  findAllArchived(@Req() req: Request & { user: AuthUser }) {
    return this.notesService.findAllArchived(req.user.id);
  }

  @Get(':id')
  findOne(
    @Req() req: Request & { user: AuthUser },
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.notesService.findOne(req.user.id, id);
  }

  @Patch(':id')
  update(
    @Req() req: Request & { user: AuthUser },
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(req.user.id, id, updateNoteDto);
  }

  @Delete(':id')
  remove(
    @Req() req: Request & { user: AuthUser },
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.notesService.remove(req.user.id, id);
  }
}
