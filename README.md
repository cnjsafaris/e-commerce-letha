# LethaShop - Premium Leather E-commerce Platform

A modern, full-featured e-commerce platform built with Next.js 15, React 19, and Supabase, specializing in premium leather goods.

## 🚀 Features

- **Modern Stack**: Next.js 15 with React 19 and TypeScript
- **Authentication**: Secure user authentication with Supabase Auth
- **Admin Dashboard**: Complete admin interface for product management
- **Shopping Cart**: Persistent cart with localStorage fallback
- **Payment Integration**: Ready for Stripe/payment processor integration
- **SEO Optimized**: Built-in SEO with structured data and sitemap
- **Responsive Design**: Modern UI with Tailwind CSS and shadcn/ui
- **Database**: PostgreSQL with Supabase backend
- **Testing**: E2E tests with Playwright
- **Deployment Ready**: Configured for Netlify and Vercel

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4
- **Frontend**: React 19, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Testing**: Playwright E2E testing
- **Deployment**: Netlify/Vercel ready

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/cnjsafaris/e-commerce-letha.git
cd e-commerce-letha
pnpm install
```

### 2. Environment Setup

Copy the example environment file and update with your Supabase credentials:

```bash
cp .env.example .env.local
```

Update `.env.local` with your Supabase project details:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Database Setup

Run the SQL scripts in your Supabase SQL editor:

1. `scripts/001_create_ecommerce_tables.sql` - Creates main tables
2. `scripts/002_seed_sample_data.sql` - Adds sample data
3. `scripts/003_create_profile_trigger.sql` - Sets up user profiles
4. `scripts/004_add_admin_roles.sql` - Configures admin access

### 4. Run Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` to see the application.

### 5. Admin Access

Default admin credentials:
- Email: `jabezmageto78@gmail.com`
- Password: `lokeshen@58`

Access admin dashboard at `/admin`

## 📦 Deployment

### Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Set build command: `pnpm build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard
5. Deploy!

The project includes `netlify.toml` with optimized configuration.

### Vercel Deployment

1. Import your GitHub repository to Vercel
2. Vercel will auto-detect Next.js
3. Add environment variables
4. Deploy!

The project includes `vercel.json` with optimized configuration.

## 🧪 Testing

Run E2E tests with Playwright:

```bash
# Run all tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests in headed mode
pnpm test:headed
```

## 📁 Project Structure

```
├── app/                    # Next.js app router
│   ├── admin/             # Admin dashboard pages
│   ├── auth/              # Authentication pages
│   ├── products/          # Product catalog
│   └── ...
├── components/            # Reusable UI components
├── contexts/              # React contexts
├── lib/                   # Utility functions
├── public/                # Static assets
├── scripts/               # Database scripts
├── tests/                 # E2E tests
└── styles/                # Global styles
```

## 🔧 Key Features

### Shopping Cart
- Persistent cart with Supabase integration
- localStorage fallback for reliability
- Real-time cart updates

### Admin Dashboard
- Product management (CRUD operations)
- Order management
- User management
- Category management

### Authentication
- Secure user registration/login
- Protected routes
- Role-based access control

### Performance
- Static site generation where possible
- Optimized images with Next.js Image
- Efficient data fetching

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@lethashop.com or open an issue on GitHub.

---

**Built with ❤️ for premium leather goods enthusiasts**