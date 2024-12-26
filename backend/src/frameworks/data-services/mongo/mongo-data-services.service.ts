import { Inject, Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongoGenericRepository } from "./mongo-generic-repository";
import {
  UserDocument,
  User,
  Notification,
  NotificationDocument,
  ServiceDocument,
  FaqDocument,
  Service,
  Faq,
  Blog,
  BlogDocument,
  Partner,
  PartnerDocument,
  Contact,
  ContactDocument,
  Galerie,
  GalerieDocument,
  Reservation,
  Review
 
} from "./model";

@Injectable()
export class MongoDataServices
  implements  OnApplicationBootstrap
{
  users: MongoGenericRepository<User>;
  notifications: MongoGenericRepository<Notification>;
  services: MongoGenericRepository<Service>;
  faqs: MongoGenericRepository<Faq>;
  blogs: MongoGenericRepository<Blog>; 
  partners: MongoGenericRepository<Partner>;
  contacts: MongoGenericRepository<Contact>;
  galeries: MongoGenericRepository<Galerie>;
  reservations: MongoGenericRepository<Reservation>;
  reviews: MongoGenericRepository<Review>;
  constructor(
    @InjectModel(User.name)
    private UserRepository: Model<UserDocument>,
  
    @InjectModel(Notification.name)
    private NotificationRepository: Model<NotificationDocument>,

    @InjectModel(Service.name)
    private ServiceRepository: Model<ServiceDocument>,


    @InjectModel(Faq.name)
    private FaqRepository: Model<FaqDocument>,

    @InjectModel(Blog.name)
    private BlogRepository: Model<BlogDocument>,

    @InjectModel(Partner.name)
    private PartnerRepository: Model<PartnerDocument>,

    @InjectModel(Contact.name)
    private ContactRepository: Model<ContactDocument>,

    @InjectModel(Galerie.name)
    private GalerieRepository: Model<GalerieDocument>,
  
    @InjectModel(Reservation.name)
    private ReservationRepository: Model<Reservation>,

    @InjectModel(Review.name)
    private ReviewRepository: Model<Review>, 
    
  
  ) {}

  onApplicationBootstrap() {
 
    this.users = new MongoGenericRepository<User>(this.UserRepository);
  
    this.notifications = new MongoGenericRepository<Notification>(
      this.NotificationRepository,
      ["transfertRequestId", "recipient"],
    );
   
    this.services = new MongoGenericRepository<Service>(this.ServiceRepository);

    
    this.faqs = new MongoGenericRepository<Faq>(this.FaqRepository);

    this.blogs = new MongoGenericRepository<Blog>(this.BlogRepository);

    this.partners = new MongoGenericRepository<Partner>(this.PartnerRepository);

  
    this.contacts = new MongoGenericRepository<Contact>(this.ContactRepository);

    this.galeries = new MongoGenericRepository<Galerie>(this.GalerieRepository);

    this.reservations = new MongoGenericRepository<Reservation>(this.ReservationRepository);

    this.reviews = new MongoGenericRepository<Review>(this.ReviewRepository);
    
  }
}
