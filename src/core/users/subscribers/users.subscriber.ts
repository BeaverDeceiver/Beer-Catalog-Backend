import { hash } from '../../../common/helpers/hash';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { User } from '../entities/user.entity';

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>) {
    event.entity.password = hash(event.entity.password);
  }

  beforeUpdate(event: UpdateEvent<User>) {
    if (event.entity.password) {
      event.entity.password = hash(event.entity.password);
    }
  }
}
