/* eslint-disable no-useless-catch */
import { Blog, CreateBlogDto, IDataServices, UpdateBlogDto } from "src/core";
import { BlogFactoryService } from "./blog-factory.service";
import { Injectable } from '@nestjs/common';
import { BASE_URL } from "src/configuration";


@Injectable()
export class BlogUseCases {
    constructor(
        private blogFactoryService: BlogFactoryService,
        private dataServices: IDataServices,

    ) {}
    
    async createBlog(createBlogDto: CreateBlogDto,
        file: Express.Multer.File): Promise<Blog> {
        // eslint-disable-next-line no-useless-catch
        try {
            createBlogDto.image = file
                ? `${BASE_URL}/uploads/${file.filename}`
                : null;
            const newBlogData = this.blogFactoryService.createNewBlog({ ...createBlogDto });
            const newBlog= await this.dataServices.blogs.create(newBlogData);
            return newBlog;
        } catch (error) {
            throw error;
        }
        
    }

    async getAllBlogs(): Promise<Blog[]> {
        try {
            const blogs = await this.dataServices.blogs.findAllByAttribute('deletedAt', null);
            return blogs;
        } catch (error) {
            throw error;
        }
    }

    async getBlogById(id: string): Promise<Blog> {
        try {
            const blog = await this.dataServices.blogs.get(
                {
                    _id: id,
                    deletedAt: null,
                },
            );
            return blog;
        } catch (error) {
            throw error;
        }
    }

    async updateBlog(id: string,
        updateBlogDto: UpdateBlogDto,
        file: Express.Multer.File) : Promise<Blog>{
        try {
            const blog = await this.dataServices.blogs.get(
                {
                    _id: id,
                    deletedAt: null,
                },
            );
            if (!blog) {
                throw new Error('Blog not found');
            }
            updateBlogDto.image = file
                ? `${BASE_URL}/uploads/${file.filename}`
                : null;
            const updatedBlogData = this.blogFactoryService.updateBlog({ ...updateBlogDto });
            const updatedBlog = await this.dataServices.blogs.update(id, updatedBlogData);
            return updatedBlog;
        } catch (error) {
            throw error;
        }
    }        
    
    async deleteBlog(id: string): Promise<boolean> {
        try {
            const blog = await this.dataServices.blogs.get(
                {
                    _id: id,
                    deletedAt: null,
                },
            );
            if (!blog) {
                throw new Error('Blog not found');
            }
            const deletedBlog = await this.dataServices.blogs.delete(id);
            return deletedBlog ? true : false;
        } catch (error) {
            throw error;
        }
    }
}