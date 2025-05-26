# 🎯 Tsilovo — Smart Goal & Task Tracker

## 🚀 Live Demo

Check out the app live: [Tsil`ovo](https://tsilovo.vercel.app/uk)

## ✨ About Tsilovo

**Tsilovo** is a minimalistic and powerful productivity app designed to help you focus on what truly matters.  
Plan up to **5 goals at a time**, manage daily tasks, track weekly and yearly progress, and stay balanced across all areas of life.

---

## 🚀 Features

- 📌 Set up to **5 active goals**
- ✅ Add, edit, complete, and reorder **daily tasks** (up to 20/day per goal)
- 📊 Weekly and yearly **statistics and insights**
- 🌗 **Dark/light theme** toggle (auto-detects system theme)
- 🌍 **Multilingual support** (Ukrainian 🇺🇦 and English 🇬🇧)
- 🧠 Focus-oriented UX with drag-and-drop, achievements, and visual feedback

---

# 🧩 Tech Stack

## 🧑‍💻 Frontend Tech Stack

### ⚙️ Framework & Language
- **Next.js 15** – App Router, SSR, RSC
- **React 19** – Concurrent rendering
- **TypeScript** – Static typing

### 🎨 UI & Styling
- **MUI (Material UI)** – Component library
- **Emotion** – CSS-in-JS styling
- **Sass** – Extended CSS features
- **classnames** – Dynamic class handling
- **next-themes** – Theme switching (light/dark/system)

### 🌍 Internationalization & Localization
- **next-intl** – Multilingual support (UA/EN)
- Automatically detects browser locale

### 📦 Forms & Validation
- **react-hook-form** – Lightweight form handling
- **yup** – Flexible schema-based validation

### 🔄 State Management & Data Fetching
- **@tanstack/react-query** – Caching, syncing, and fetching data

### 🔐 Authentication & Toasts
- **axios** – API communication
- **react-hot-toast** – Toast notifications
- **JWT** – Auth with httpOnly cookies (handled on backend)

### 📦 File Uploads & Drag-n-Drop
- **EdgeStore** – Free and secure media storage (stores avatar URLs)
- **@hello-pangea/dnd** – Drag & drop UI for tasks

# 🚀 Backend Tech Stack

### 🧱 Core Stack
- **NestJS** – Modular and maintainable server-side framework
- **TypeScript** – Strong typing and developer tooling
- **MongoDB** + **Typegoose** – NoSQL database with class-based models

### 🔐 Authentication
- **JWT** – Secure authentication using httpOnly cookies
- **Google OAuth2** – Social login integration

### 📬 Email & Notifications
- **Nodemailer** – Localized transactional emails
- Templates rendered with **Handlebars**

### 📅 Scheduling & Automation
- **@nestjs/schedule (Cron Jobs)** – Weekly cleanup of deactivated users

### 📈 Other Features
- **Rate Limiting** – Protects against abuse
- **Validation** – Using `class-validator` and `class-transformer`

# 🔧 Developer Tools & Code Quality

- **ESLint + Prettier** – Linting and formatting
- **Commitlint + Commitizen** – Conventional commit standards
- **lint-staged** – Git pre-commit hook integration
- **prettier-plugin-sort-imports** – Automatic import sorting

---

## ⚙️ Project Setup

```bash
# Install dependencies
yarn install

# Run frontend
yarn dev

# Run backend
yarn start
```
---

# 📸 Screenshots

### 🗓️ Planner – Main Interface
![Planner main](https://github.com/Yasya23/Tsilovo_planner/blob/main/planner-fe/public/images/planner.png)

### 📊 Planner – Statistics View
![Planner statistics](https://github.com/Yasya23/Tsilovo_planner/blob/main/planner-fe/public/images/statistic.png)

### ⚙️ Planner – Settings Page
![Planner settings](https://github.com/Yasya23/Tsilovo_planner/blob/main/planner-fe/public/images/settings.png)

### ❓ Planner – Help Section
![Planner help](https://github.com/Yasya23/Tsilovo_planner/blob/main/planner-fe/public/images/help.png)



## 🙋‍♀️ Contact

Created by [Yana Zahoruiko](https://github.com/Yasya23) – feel free to reach out!
