# Sopfuel

Sopfuel is an AI-powered platform designed to help users generate, manage, and visualize Standard Operating Procedures (SOPs) and workflows. It provides a modern, interactive dashboard for creating, editing, and exporting SOPs, with support for user authentication, billing, and premium features.

## Features
- AI-driven SOP generation and enhancement
- Interactive workflow visualization and whiteboard
- User authentication and profile management
- Billing and premium subscription management
- Export SOPs to PDF and other formats
- Responsive, modern UI built with React and TypeScript
- Supabase integration for backend services

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Sopfuel
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables:**
   - Configure your Supabase credentials and any other required environment variables as needed.

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

5. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Usage
- Sign up or log in to access the dashboard.
- Generate new SOPs using the AI-powered form.
- Visualize and edit workflows interactively.
- Manage your account, billing, and subscription.
- Export SOPs as needed.

## Project Structure
- `src/` - Main source code
  - `components/` - React components (modals, dashboard, UI, etc.)
  - `hooks/` - Custom React hooks for data and state management
  - `integrations/` - Supabase client and types
  - `lib/` - Utility functions
  - `pages/` - Top-level pages/routes
  - `utils/` - Export utilities (PDF, workflow)
- `public/` - Static assets
- `supabase/` - Supabase configuration and migrations
- `docs/` - Documentation

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
[Specify your license here] 