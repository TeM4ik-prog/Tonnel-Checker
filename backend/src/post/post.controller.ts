import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { updatePostDto } from './dto/update-post.dto';


@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  create(
    @UploadedFiles() file,
    @Body() createPostDto: CreatePostDto,
  ) {
    console.log('BODY', createPostDto);
    console.log('FILES', file[0]);

    

    return this.postService.create({createPostDto: createPostDto, imagePath: `/uploads/${file[0].originalname}`})
  }

  @Get(':category')
  findAll(@Param('category') categoryName: string) {
    return this.postService.findAll(categoryName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: updatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postService.delete(id);
  }
}
