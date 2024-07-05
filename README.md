# Ai Print Shop

## Docs

**Download excalidraw plugin and see the docs directory**

## Technologies

-   UI - NextJs

## User Story

-   I want to enter text about what I want to print on a t shirt, mug or hoodie
-   I want the website to multiple options for what I want and to display it on different things
-   I want to select which product I want
-   I want to pay for this product
-   I want emails telling me about my purchase and delivery
-   I want to be delivered the product

# Webhooks

-   Install stripe CLI from https://docs.stripe.com/stripe-cli
-   Run `stripe login` and login

To listen to payment intent succeeded event:

```bash
  stripe listen --events payment_intent.succeeded --forward-to localhost:3000/api/webhooks/pi_success
```

or

```bash
  npm run stripe:listen
```

# DB

-   Need to have .env.development.local with updated pg connection values

Update schema:

```bash
  npm run db:push
```

Studio:

```bash
  npm run db:studio
```

# Playwright Commands

`npx playwright install`
Installs the necessary dependencies.

`npx playwright test`
Runs the end-to-end tests.

`npx playwright test --ui`
Starts the interactive UI mode.

`npx playwright test --project=chromium`
Runs the tests only on Desktop Chrome.

`npx playwright test example`
Runs the tests in a specific file.

`npx playwright test --debug`
Runs the tests in debug mode.

`npx playwright codegen`
Auto generate tests with Codegen.
