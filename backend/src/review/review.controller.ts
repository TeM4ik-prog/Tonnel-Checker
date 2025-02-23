import { Controller, Get, Post, Body, Patch, Param, Delete, Header, Res, UploadedFile, UseInterceptors, UploadedFiles, NotFoundException } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import * as fs from 'fs';
import { Response } from 'express';
import * as path from 'path';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as pdfParse from 'pdf-parse'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  // http://localhost:3000/api/review/newspapers/
  @Get("newspapers/:filename")
  getFile(@Param("filename") filename: string, @Res() res: Response) {
    const filePath = path.resolve('', 'uploads/newspapers', filename)

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException("Файл не найден");
    }

    res.setHeader("Content-Type", "application/pdf");
    return res.sendFile(filePath);
  }


  @Get('getNewspapers')
  async getFiles(@Res() res: Response) {
    const directoryPath = path.resolve('', 'uploads/newspapers')

    // fs.readdir(directoryPath, async (err, files) => {
    //   if (err) {
    //     return res.status(500).send('Не удалось прочитать папку')
    //   }

    //   const pdfFiles = files.filter(file => file.endsWith('.pdf'))
    //   const filesInfo = []

    //   for (const file of pdfFiles) {
    //     const filePath = path.join(directoryPath, file)
    //     const pdfBuffer = fs.readFileSync(filePath)

    //     try {
    //       const data = await pdfParse(pdfBuffer)
    //       const title = data.info.Title || file

    //       filesInfo.push({
    //         title,
    //         filePath: `${file}`,
    //       })
    //     } catch (error) {
    //       filesInfo.push({
    //         title: file, 
    //         filePath: `${file}`,
    //       })
    //     }
    //   }

    //   return res.json(filesInfo)
    // })

    res.json(
      [
        {
            "title": "Sunset",
            "filePath": "1.pdf"
        },
        {
            "title": "БЭМС",
            "filePath": "2.pdf"
        },
        {
            "title": "11.11.2024",
            "filePath": "3.pdf"
        },
        {
            "title": "Гимназический вестник",
            "filePath": "4.pdf"
        },
        {
            "title": "Гимназический вестник . №5",
            "filePath": "5.pdf"
        }
    ]
    )
  }

  // 


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
  @UseInterceptors(FileInterceptor('sourceFile'))
  async createReview(
    @Body() body: { text: string },
    @UploadedFile() sourceFile,
  ) {
    console.log(body, sourceFile)
    return this.reviewService.create(body.text, `/uploads/videos/${sourceFile.filename}`)
  }

  @Get()
  findAll() {
    return this.reviewService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  updateReview(@Param('id') id: string, @Body() UpdateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(id, UpdateReviewDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }



}
