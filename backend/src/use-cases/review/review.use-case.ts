/* eslint-disable no-useless-catch */
import { Injectable } from "@nestjs/common";
import { ReviewFactoryService } from "./review-factory.service";
import { CreateReviewDto, IDataServices, Review, UpdateReviewDto } from "src/core";
import { BASE_URL } from "src/configuration";

@Injectable()
export class ReviewUseCases{
    constructor(
        private readonly reviewFactoryService: ReviewFactoryService,
        private dataServices: IDataServices
    )
    {}

    async createReview(createReviewDto: CreateReviewDto,
        file: Express.Multer.File,
        ): Promise<Review> {
        try {
            createReviewDto.image = file
            ? `${BASE_URL}/uploads/${file.filename}`
            : null;
            const newReviewData = this.reviewFactoryService.createNewReview(createReviewDto);
            const newReview = await this.dataServices.reviews.create(newReviewData);
            return newReview;
        } catch (error) {
            throw error;
        }
    }

    async getAllReviewsApproved(): Promise<Review[]> {
        try {
          

            const reviews = await this.dataServices.reviews.findAllByAttributes({ deletedAt: null, status: "approved" });
    
            const reviewsWithAvatars = await Promise.all(reviews.map(async (review) => {
                const user = await this.dataServices.users.get(review.userId);
                review.avatar = user ? user.avatar || null : null;
                return review;
            }));
            

            return reviewsWithAvatars;
        } catch (error) {
            throw error;
        }
    }

    async getAllReviews(page: number, limit: number): Promise<Review[]> {
        try {
            const offset = (page - 1) * limit;

            const reviews = await this.dataServices.reviews.findAllByAttribute( 'deletedAt', null);
    
            const reviewsWithAvatars = await Promise.all(reviews.map(async (review) => {
                const user = await this.dataServices.users.get(review.userId);
                review.avatar = user ? user.avatar || null : null;
                review.fullName = user ? user.firstName + " " + user.lastName : null;
                return review;
            }));
            const pagination = reviewsWithAvatars.slice(offset,limit)

            return pagination;
        } catch (error) {
            throw error;
        }
    }

    async getReviewById(id: string): Promise<Review> {
        try {
            const review = await this.dataServices.reviews.get({ _id: id, deletedAt: null });
            return review;
        } catch (error) {
            throw error;
        }
    }

    async getReviewByUserId(userId: string): Promise<Review[]> {
        try {
            const reviews = await this.dataServices.reviews.findAllByAttributes({ userId, deletedAt: null });
            return reviews;
        } catch (error) {
            throw error;
        }
    }

    async updateReview(id: string, updateReviewDto: UpdateReviewDto,
        file: Express.Multer.File): Promise<Review> {
      
        try {
            const review = await this.dataServices.reviews.get({_id: id, deletedAt: null});
            if (!review) {
                throw new Error("Review not found");
            }
            updateReviewDto.image = file
            ? `${BASE_URL}/uploads/${file.filename}`
            : null;
            const updatedReviewData = this.reviewFactoryService.updateReview(updateReviewDto);
            const updatedReview = await this.dataServices.reviews.update(id, updatedReviewData);
            return updatedReview;
        } catch (error) {
            throw error;
        }
    }

    async deleteReview(id: string): Promise<boolean> {
        try {
            const review = await this.dataServices.reviews.get({
                _id: id,
                deletedAt: null
            });
            if (!review) {
                throw new Error("Review not found");
            }
            await this.dataServices.reviews.delete(id);
            return review? true : false;
        } catch (error) {
            throw error;
        }
    }

    async approveReview(id: string): Promise<Review> {
        try {
            const review = await this.dataServices.reviews.get({ _id: id, deletedAt: null });
            if (!review) {
                throw new Error("Review not found");
            }
    
            review.status = "approved";
            const updatedReview = await this.dataServices.reviews.update(id, review);
            return updatedReview;
        } catch (error) {
            throw error;
        }
    }
}