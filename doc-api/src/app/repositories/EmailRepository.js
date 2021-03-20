import path from 'path';
import User from '../models/User';

class EmailRepository {
  joinTemplatePath(fileName) {
    return path.join(__dirname, '..', 'views', 'emails', fileName);
  }

  getEmailTemplate(template) {
    if (template === 'welcome') {
      return this.joinTemplatePath('welcome.ejs');
    }
  }

  async getEmailData(userId, template) {
    if (template === 'welcome') {
      const attributes = ['name', 'email'];
      const response = await User.findByPk(userId, { attributes });
      if (!response) return undefined;

      const { name, email } = response.dataValues;
      return { name, to: email };
    }
  }

  getEmailConfig(template) {
    if (template === 'welcome') {
      return {
        from: 'services-boilerplate@github.com',
        subject: '<no-reply> Hello, welcome!',
      };
    }
  }
}

export default new EmailRepository();
