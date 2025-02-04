import { Controller, Get, Post, Body, Patch, Param, Delete, Header, Res, UploadedFile, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import * as fs from 'fs';
import { Response } from 'express';
import * as path from 'path';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Get(':filename')
  @Header('Content-Type', 'video/mp4')
  async getVideo(@Param('filename') filename: string, @Res() res: Response) {
    const videoPath = path.resolve('', 'uploads/videos', filename)

    console.log(videoPath)

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = res.req.headers.range;

    console.log(filename)

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = (end - start) + 1;

      const file = fs.createReadStream(videoPath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
      });

      file.pipe(res);
    } else {
      res.writeHead(200, { 'Content-Length': fileSize });
      fs.createReadStream(videoPath).pipe(res);
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('videoFile'))
  async createReview(
    @Body() body: { text: string },   
    @UploadedFile() videoFile, 
  ) {

    return this.reviewService.create(body.text, `/uploads/videos/${videoFile.filename}`)

  }

  @Get()
  findAll() {
    return this.reviewService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }


  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }


  
}
