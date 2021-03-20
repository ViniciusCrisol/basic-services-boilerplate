import path from 'path';
import User from '../models/User';

class PdfRepository {
  joinTemplatePath(fileName) {
    return path.join(__dirname, '..', 'views', 'documents', fileName);
  }

  getPdfUrl(data) {
    return `${process.env.BASE_URL}/pdf/${JSON.stringify(data)}`;
  }

  getPdfTemplate(template) {
    if (template === 'users-report') {
      return this.joinTemplatePath('users_report.ejs');
    }
  }

  async getPdfData(userId, template) {
    if (template === 'users-report') {
      const attributes = ['name'];
      const response = await User.findByPk(userId, { attributes });
      if (!response) return undefined;

      const { name } = response.dataValues;
      return { name };
    }
  }
}

export default new PdfRepository();
