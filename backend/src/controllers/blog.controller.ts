import { Controller, Post, UseInterceptors, UploadedFile, Body, Get, Param, Put, Delete, UseGuards } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { imageAndPdfFilter, storage } from "src/configuration/multer.config";
import { Blog, CreateBlogDto, UpdateBlogDto } from "src/core";
import { JwtAuthGuard } from "src/core/guards/jwtauth.guard";
import { Roles } from "src/core/roles/role.decorator";
import { Role } from "src/core/roles/role.enum";
import { RolesGuard } from "src/core/roles/roles.guard";
import { BlogUseCases } from "src/use-cases/blog/blog.use-case";

@ApiTags("api/blog")
@Controller('api/blog')
export class BlogController {


  
    constructor(private readonly blogUseCases: BlogUseCases) { }

    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @ApiConsumes("multipart/form-data")
    @Post()
    @UseInterceptors(
      FileInterceptor("image", {
        storage: storage,
        fileFilter: imageAndPdfFilter,
      }),
    )
    @Post()
    @ApiBody({ type: CreateBlogDto })
    async createBlog(@Body() blog: CreateBlogDto,
    @UploadedFile() file: Express.Multer.File,
    ): Promise<Blog> {
        return this.blogUseCases.createBlog({...blog},file);
    }

    @Get()
    async getAllBlogs(): Promise<Blog[]> {
        return this.blogUseCases.getAllBlogs();
    }

    @Get(':id')
    async getBlogById(@Param('id') id: string): Promise<Blog> {
        return this.blogUseCases.getBlogById(id);
    }

    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @ApiConsumes("multipart/form-data")
    @Put(':id')
    @UseInterceptors(
      FileInterceptor("image", {
        storage: storage,
        fileFilter: imageAndPdfFilter,
      }),
    )
    @Put(':id')
    async updateBlog(@Param('id') id: string, @Body() blog: UpdateBlogDto,
    @UploadedFile() file: Express.Multer.File,
    ): Promise<Blog> {
        return this.blogUseCases.updateBlog(id, blog, file);
    }

    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @Delete(':id')
    async deleteBlog(@Param('id') id: string): Promise<boolean> {
        return this.blogUseCases.deleteBlog(id);
    }
}