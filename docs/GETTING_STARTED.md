# Getting Started - Development

## Quick Start

1. **Navigate to the app directory:**
   ```bash
   cd app/
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Adding Content

Simply add markdown files to the `../data/topics/` directory and they will automatically appear in the application.

## Environment Variables

Copy the example environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local` to customize:
- Admin credentials
- Company branding
- Color themes

## Docker Deployment

```bash
docker-compose up -d
```

## Project Structure

- `../data/topics/` - Markdown content files
- `src/` - Application source code
- `docs/` - Technical documentation
