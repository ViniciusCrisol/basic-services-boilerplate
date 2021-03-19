import axios from 'axios';
import { injectable } from 'tsyringe';

import IMailProvider from '../models/IMailProvider';

@injectable()
export default class MailProvider implements IMailProvider {
  public async sendWelcomeMail(userId: string): Promise<void> {
    axios.post(`http://localhost:8081/send/email/${userId}`, {
      template: 'welcome',
    });
  }
}
