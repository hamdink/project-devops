import { Body, Controller, Post, UploadedFile, UseInterceptors, Get, Put, Param, Delete, UseGuards, Query} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { imageAndPdfFilter, storage } from "src/configuration/multer.config";
import { CreateReviewDto, Review, UpdateReviewDto } from "src/core";
import { JwtAuthGuard } from "src/core/guards/jwtauth.guard";
import { Roles } from "src/core/roles/role.decorator";
import { Role } from "src/core/roles/role.enum";
import { RolesGuard } from "src/core/roles/roles.guard";
import { ReviewUseCases } from "src/use-cases/review/review.use-case";

@ApiTags("api/review")
@Controller("api/review")  
export class ReviewController{

    constructor(
        private reviewUseCases: ReviewUseCases,
    ){}

     @UseGuards(JwtAuthGuard)
     @ApiBearerAuth()
    @UseInterceptors(
        FileInterceptor("image", {
          storage: storage,
          fileFilter: imageAndPdfFilter,
        }),
      )
    @Post()
    async createReview(@Body() review: CreateReviewDto,
    @UploadedFile() file: Express.Multer.File,
    ): Promise<Review> {
        return this.reviewUseCases.createReview({...review}, file);
    }


    @Get()
    async getAllReviews(
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<Review[]> {
        return this.reviewUseCases.getAllReviews(page, limit);
    }

    @Get('approved')
    async getAllReviewsApproved(
        
    ): Promise<Review[]> {
        return this.reviewUseCases.getAllReviewsApproved();
    }

     @UseGuards(JwtAuthGuard)
     @ApiBearerAuth()
    @Get(':id')
    async getReviewById(@Param("id") id: string): Promise<Review> {
        return this.reviewUseCases.getReviewById(id);
    }

     @UseGuards(JwtAuthGuard)
     @ApiBearerAuth()
    @Get('user/:userId')
    async getReviewByUserId(@Param("userId") userId: string): Promise<Review[]> {
        return this.reviewUseCases.getReviewByUserId(userId);
    }

     @UseGuards(JwtAuthGuard)
     @ApiBearerAuth()
    @Put(':id')
    async updateReview(@Param('id') id: string, @Body() review: UpdateReviewDto,
    @UploadedFile() file: Express.Multer.File): Promise<Review> {
        return this.reviewUseCases.updateReview(id, {...review}, file);
    }

     @UseGuards(JwtAuthGuard)
     @ApiBearerAuth()

    @Delete(':id')
    async deleteReview(@Param('id') id: string): Promise<boolean> {
        return this.reviewUseCases.deleteReview(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @ApiBearerAuth()
    @Put('approve/:id')
    async approveReview(@Param('id') id: string): Promise<Review> {
        return this.reviewUseCases.approveReview(id);
    }
    
   

}