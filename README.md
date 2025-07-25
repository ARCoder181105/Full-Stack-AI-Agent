# AI Ticket Assistant

An intelligent, full-stack ticketing system designed to streamline technical support workflows using AI. This application allows users to submit support tickets, which are then automatically analyzed, prioritized, and assigned to the most suitable support agent.

## Core Features

* **User Authentication**: Secure signup and login system for users, moderators, and admins.
* **Ticket Management**: A clean interface for users to create and view their support tickets.
* **AI-Powered Triage**: New tickets are automatically processed by an AI agent (powered by Google's Gemini model) to:
    * Estimate the ticket's **priority** (low, medium, high).
    * Identify the **technical skills** required to resolve the issue.
    * Generate **helpful notes** and resources for the support agent.
* **Automated Assignment**: The system intelligently assigns tickets to available moderators based on their listed skills, ensuring the right person is on the job.
* **Email Notifications**: Users receive a welcome email upon signup, and moderators are notified when a new ticket is assigned to them.
* **Admin Panel**: A dedicated interface for administrators to manage user roles and skills.

### Technology Stack

* **Backend**: Node.js, Express, MongoDB (with Mongoose), Inngest (for background jobs), Nodemailer
* **Frontend**: React, Vite, Tailwind CSS, daisyUI
* **AI**: Google Gemini Pro

---

## 🚧 Project Status: Under Development

This project is currently under active development. The foundational features are in place, and I am now focused on refining the system, improving the AI integration, and enhancing the user interface.

**The first version with the core features will be deployed soon.** I'm looking forward to sharing a stable, live version of the AI Ticket Assistant and welcome feedback as I continue to build.