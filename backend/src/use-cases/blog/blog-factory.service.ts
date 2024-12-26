import { Injectable } from "@nestjs/common";
import { Blog, CreateBlogDto, UpdateBlogDto } from "src/core";

@Injectable()
export class BlogFactoryService {
    createNewBlog(createBlogDto: CreateBlogDto) {
        const newBlog = new Blog();
        newBlog.title = createBlogDto.title;
        newBlog.content = createBlogDto.content;
        newBlog.person = createBlogDto.person;
        newBlog.image = createBlogDto.image;
        newBlog.createdAt = new Date();
        return newBlog;
    }

    updateBlog(updateBlogDto: UpdateBlogDto) {
        const updatedBlog = new Blog();
        updatedBlog.title = updateBlogDto.title;
        updatedBlog.content = updateBlogDto.content;
        updatedBlog.person = updateBlogDto.person;
        updatedBlog.image = updateBlogDto.image;
        updatedBlog.updatedAt = new Date();

        return updatedBlog;
    }
}
