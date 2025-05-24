"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs = __importStar(require("fs"));
const Handlebars = __importStar(require("handlebars"));
const nodemailer = __importStar(require("nodemailer"));
const path = __importStar(require("path"));
let MailService = class MailService {
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('SMTP_HOST'),
            port: this.configService.get('SMTP_PORT'),
            secure: this.configService.get('SMTP_SECURE'),
            auth: {
                user: this.configService.get('SMTP_USER'),
                pass: this.configService.get('SMTP_PASS'),
            },
        });
    }
    async sendEmail({ to, subject, token, locale, name, }) {
        const html = this.generateHtmlBySubject({ subject, token, locale, name });
        const appName = locale === 'uk' ? 'Цільово' : 'Tsil`ovo';
        await this.transporter.sendMail({
            from: `"${appName}" <${this.configService.get('SMTP_FROM')}>`,
            to,
            subject,
            html,
        });
    }
    generateHtmlBySubject({ subject, token, locale, name, }) {
        const templateName = this.getTemplateNameBySubject(subject);
        const filePath = path.resolve(process.cwd(), 'src', 'modules', 'mail', 'templates', locale, `${templateName}.hbs`);
        if (!fs.existsSync(filePath)) {
            throw new Error(`Email template not found: ${filePath}`);
        }
        const templateSource = fs.readFileSync(filePath, 'utf-8');
        const template = Handlebars.compile(templateSource);
        const urlBase = this.configService.get('FRONTEND_URL');
        const supportEmail = this.configService.get('SUPPORT_EMAIL');
        const url = subject === 'account deletion confirmation'
            ? `${urlBase}/confirm-delete?token=${token}`
            : subject === 'reset password'
                ? `${urlBase}/reset-password?token=${token}`
                : undefined;
        return template({
            subject,
            token,
            url,
            name,
            email: supportEmail,
        });
    }
    getTemplateNameBySubject(subject) {
        switch (subject.toLowerCase()) {
            case 'account deletion confirmation':
                return 'account-deletion-confirmation';
            case 'welcome':
                return 'welcome';
            case 'reset password':
                return 'reset-password';
            case 'password has changed':
                return 'password-has-changed';
            case 'email has changed':
                return 'email-has-changed';
            case 'account was deleted':
                return 'account-was-deleted';
            default:
                throw new Error(`Unhandled subject: ${subject}`);
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map