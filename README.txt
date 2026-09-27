PRESIDENCY PERFUMES - STARTER

1. Install Node.js LTS.
2. Open this folder in CMD.
3. Run SETUP-WINDOWS.cmd
4. Then run: npm run dev
5. Open: http://localhost:3000

IMPORTANT:
- Copy .env.example to .env.local and set NEXT_PUBLIC_WHATSAPP_NUMBER to the real Presidency WhatsApp number (digits only).
- Never place passwords, service-role keys, or private tokens in NEXT_PUBLIC_* variables. .env* files are ignored by git.
- Configure all rate-limit values from .env.example. The included in-memory limiter is for a single Next.js process; use Redis/KV before deploying multiple instances.
- /api/test-supabase is a local diagnostic route. It is disabled in production and deliberately returns no database records or provider error details.
- This starter uses the supplied Presidency logo.
- The sample catalogue contains a few products to establish the architecture.
- The remaining perfume images from the ZIP can be mapped into /public/perfumes and added to lib/products.ts.
- No online payment gateway is included.
