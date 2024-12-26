import { Injectable } from "@nestjs/common";
import { CreateFaqDto, Faq, UpdateFaqDto } from "src/core";

@Injectable()
export class FaqFactoryService {
  createNewFaq(createFaqDto: CreateFaqDto) {
    const newFaq = new Faq();
    newFaq.question = createFaqDto.question;
    newFaq.answer = createFaqDto.answer;
    newFaq.createdAt = new Date();
    return newFaq;
  }

  updateFaq(updateFaqDto: UpdateFaqDto) {
    const updatedFaq = new Faq();
    updatedFaq.question = updateFaqDto.question;
    updatedFaq.answer = updateFaqDto.answer;
    updatedFaq.updatedAt = new Date();

    return updatedFaq;
  }
}