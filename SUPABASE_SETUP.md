# Supabase Integration Setup

This guide will help you set up Supabase for your Lead Hero Knowledge Base application.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. Node.js and npm installed on your system

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `lead-hero-knowledgebase`
   - Database Password: (choose a strong password)
   - Region: (choose closest to your users)
5. Click "Create new project"

## Step 2: Set Up Database Schema

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `supabase-schema.sql` from this project
3. Paste it into the SQL Editor
4. Click "Run" to execute the schema

This will create:
- `categories` table for organizing resources
- `resources` table for storing knowledge base content
- `view_counts` table for tracking resource views
- Row Level Security (RLS) policies
- Sample data

## Step 3: Configure Authentication

1. In your Supabase dashboard, go to Authentication > Settings
2. Under "Site URL", add your development URL: `http://localhost:8081`
3. Under "Redirect URLs", add: `http://localhost:8081/login`
4. Go to Authentication > Users
5. Click "Add user" to create an admin user:
   - Email: `admin@example.com` (or your preferred email)
   - Password: (choose a strong password)
   - Auto Confirm User: ✅ (checked)

## Step 4: Get API Keys

1. In your Supabase dashboard, go to Settings > API
2. Copy the following values:
   - Project URL
   - Anon (public) key
   - Service role key (keep this secret!)

## Step 5: Configure Environment Variables

1. Create a `.env.local` file in your project root
2. Add the following variables:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Replace the placeholder values with your actual Supabase credentials.

## Step 6: Install Dependencies

The Supabase client is already installed. If you need to reinstall:

```bash
npm install @supabase/supabase-js
```

## Step 7: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:8081/login`
3. Try logging in with your admin credentials
4. You should be able to access the admin dashboard

## Features Included

### Authentication
- Admin login/logout
- Protected admin routes
- Session management

### Data Management
- Categories CRUD operations
- Resources CRUD operations
- View count tracking
- Real-time data updates

### Security
- Row Level Security (RLS) policies
- Public read access for published content
- Admin-only access for management operations

### Database Schema
- **categories**: Store resource categories
- **resources**: Store knowledge base articles
- **view_counts**: Track resource view statistics

## Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables" error**
   - Make sure your `.env.local` file exists and has the correct variable names
   - Restart your development server after adding environment variables

2. **Authentication not working**
   - Check that your Site URL and Redirect URLs are correctly configured in Supabase
   - Verify your admin user exists in the Supabase dashboard

3. **Database connection issues**
   - Ensure your Supabase project is active (not paused)
   - Check that the database schema was created successfully

4. **RLS policy errors**
   - Make sure you're logged in when trying to access admin features
   - Check that the RLS policies were created correctly

### Getting Help

- Check the Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
- Review the console for error messages
- Ensure all environment variables are set correctly

## Next Steps

After successful setup, you can:
1. Customize the admin interface
2. Add more sophisticated user management
3. Implement additional features like search, analytics, etc.
4. Deploy to production with proper environment variables

