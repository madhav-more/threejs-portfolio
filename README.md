# 🌐 Personal Portfolio Website  

This is my **personal portfolio website** built with modern web technologies. It showcases my skills, projects, and experience as a developer while maintaining a **stunning Glassmorphism-inspired design**.  

---

## 🚀 Features  

- **Responsive Design** – Works seamlessly on desktop, tablet, and mobile.  
- **Modern Tech Stack** – Built using ReactJS, NextJS, NodeJS, and Tailwind CSS.  
- **Glassmorphism UI** – Smooth animations, gradients, and glowing hover effects.  
- **Full Navigation** – Separate pages for About, Skills, Education, Projects, and Contact.  
- **AI Project Showcases** – Highlights projects integrating AI frameworks such as LangChain, LangGraph, and OpenAI/Gemini APIs.  
- **Contact Form** – Users can send messages directly via EmailJS/Nodemailer.  
- **Performance Optimized** – Fast load times with Next.js optimizations.  

---

## 🛠️ Tech Stack  

- **Frontend**: ReactJS, NextJS, Tailwind CSS, Framer Motion  
- **Backend**: NodeJS, ExpressJS  
- **Email Service**: EmailJS / Nodemailer  
- **Deployment**: Vercel / Netlify (recommended)  

---

## 📂 Project Structure  

```bash
├── public/               # Static assets (images, icons, background art)
├── src/
│   ├── components/       # Reusable UI components (Navbar, Footer, Contact, etc.)
│   ├── pages/            # Next.js pages (Home, About, Skills, Projects, Contact)
│   ├── hooks/            # Custom hooks (e.g., useAlert)
│   ├── styles/           # Global styles
│   └── utils/            # Helper functions
├── .env.local            # Environment variables (EmailJS / Nodemailer keys)
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
⚡ Getting Started
1. Clone the Repository
git clone https://github.com/your-username/portfolio.git
cd portfolio

2. Install Dependencies
npm install

3. Set Up Environment Variables

Create a .env.local file in the root and add:

VITE_APP_EMAILJS_SERVICE_ID=your_service_id
VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key


For Nodemailer backend, add:

EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

4. Run Development Server
npm run dev


Navigate to http://localhost:3000
.

5. Build for Production
npm run build
npm start
