# Astro Ecommerce Boilerplate

A fully-featured, production-ready ecommerce store built with Astro, TailwindCSS, and Snipcart v3. This boilerplate includes multi-language support, multi-currency pricing, dark mode, client-side search, and SEO optimization.

## 🚀 Features

- **Astro 4.x** - Fast, modern static site generation
- **TailwindCSS** - Utility-first CSS framework
- **Snipcart v3** - Shopping cart and payment processing
- **Multi-language** - English, French, and German support
- **Multi-currency** - USD, GBP, and EUR pricing
- **Dark Mode** - Toggle between light and dark themes
- **Client-side Search** - Instant product filtering
- **Product Categories** - Organized product browsing
- **SEO Optimized** - Meta tags, OpenGraph, robots.txt, sitemap.xml
- **Docker Support** - Containerized development environment
- **Cloudflare Pages Ready** - Easy deployment

## 📁 Project Structure

```text
/
├── public/
│   ├── images/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   │   ├── en/
│   │   ├── fr/
│   │   ├── de/
│   │   ├── products/
│   │   └── categories/
│   ├── styles/
│   └── lib/
├── scripts/
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── package.json
```

## 🧰 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) (recommended) or npm
- [Docker](https://www.docker.com/) (optional, for containerized development)

## 🛠️ Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd astro-ecommerce-boilerplate
   ```

2. **Install dependencies:**

   Using Bun (recommended):
   ```bash
   bun install
   ```
   
   Or using npm:
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Copy the example environment file and update the values:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Snipcart public API key:
   ```bash
   SNIPCART_API_KEY=your-public-snipcart-key
   SITE_NAME=CoolBudgetTech
   DEFAULT_LANG=en
   DEFAULT_CURRENCY=USD
   ```

4. **Start the development server:**

   Using Bun:
   ```bash
   bun run dev
   ```
   
   Or using npm:
   ```bash
   npm run dev
   ```
   
   Your site will be available at `http://localhost:4321`

## 🐳 Docker Development

You can also run the project using Docker:

1. **Build and start the container:**

   ```bash
   docker-compose up --build
   ```
   
2. **Access the site:**

   Visit `http://localhost:4321` in your browser

## 🌐 Multi-language Support

The site supports three languages out of the box:

- English (`/en/`)
- French (`/fr/`)
- German (`/de/`)

The default language is set in the `.env` file. Users can switch languages using the language selector in the header.

## 💱 Multi-currency Support

The site supports three currencies:

- USD (US Dollar)
- GBP (British Pound)
- EUR (Euro)

The default currency is set in the `.env` file. Users can switch currencies using the currency selector in the header.

## 🛒 Snipcart Integration

This boilerplate uses Snipcart for shopping cart functionality. To enable full functionality:

1. Create a [Snipcart](https://snipcart.com/) account
2. Get your public API key from the Snipcart dashboard
3. Add it to your `.env` file

## 🚀 Deployment to Cloudflare Pages

1. **Push your code to GitHub**

2. **Connect Cloudflare Pages:**

   - Go to your Cloudflare dashboard
   - Select your account
   - Go to Pages
   - Click "Create a project"
   - Connect to your GitHub repository

3. **Configure build settings:**

   - Build command: `bun run build`
   - Build output directory: `dist`
   - Root directory: `/`

4. **Add environment variables:**

   In the Cloudflare Pages project settings, add your environment variables:
   - `SNIPCART_API_KEY`
   - `SITE_NAME`
   - `DEFAULT_LANG`
   - `DEFAULT_CURRENCY`

5. **Deploy:**

   Cloudflare will automatically deploy your site. Subsequent pushes to your repository will trigger new deployments.

## 🧞 Available Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun run dev`             | Starts local dev server at `localhost:4321`      |
| `bun run build`           | Build your production site to `./dist/`          |
| `bun run preview`         | Preview your build locally, before deploying     |
| `bun run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `docker-compose up`       | Start development server with Docker             |
| `docker-compose build`    | Build Docker containers                          |

## 📦 Project Dependencies

- astro: `^4.10.3`
- @astrojs/tailwind: `^5.1.0`
- tailwindcss: `^3.4.3`
- @types/node: `^20.14.2`
- typescript: `^5.4.5`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
