import {
  User,
  Notification,
  Service,
  Faq,
  Blog,
  Partner,
  Contact,
  Galerie,
  Reservation,
  Review,
} from "../entities";
import { IGenericRepository } from "./generic-repository.abstract";

export abstract class IDataServices {
  abstract users: IGenericRepository<User>;
  abstract notifications: IGenericRepository<Notification>;
  abstract conversations: IGenericRepository<any>;
  abstract services: IGenericRepository<Service>;
  abstract faqs: IGenericRepository<Faq>;
  abstract blogs: IGenericRepository<Blog>;
  abstract partners: IGenericRepository<Partner>;
  abstract contacts: IGenericRepository<Contact>;
  abstract galeries: IGenericRepository<Galerie>;
  abstract reservations: IGenericRepository<Reservation>;
  abstract reviews: IGenericRepository<Review>;
}
