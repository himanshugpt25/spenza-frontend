# Spenza Frontend - Webhook Dashboard

A modern, real-time dashboard for managing webhook subscriptions built with React, Vite, and Socket.io.

## Features

- **Real-time Event Streaming**: Live updates via Socket.io when webhooks are processed
- **Subscription Management**: Create, view, and cancel webhook subscriptions
- **Event History**: Paginated view of webhook delivery attempts with status
- **Authentication**: Secure JWT-based authentication with cookies
- **Responsive Design**: Modern UI with Tailwind CSS and glassmorphism effects

## Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Backend server running (see [backend README](../spenza-backend/README.md))

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd spenza-frontend
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```bash
# API Configuration
VITE_API_URL=http://localhost:3000/api/v1
```

**Environment Variables:**

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000/api/v1` |

> **Note**: The Socket.io connection automatically uses the base URL (without `/api/v1`) from `VITE_API_URL`.

### 3. Start Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173`.

## Usage Guide

### 1. Register/Login

Navigate to `http://localhost:5173` and create an account or login with existing credentials.

### 2. Create a Subscription

1. Click "Create New Subscription"
2. Enter subscription details:
   - **Name**: Descriptive name for your webhook
   - **Target URL**: Your webhook receiver endpoint (e.g., `http://localhost:8080/webhook`)
   - **Description** (optional): Additional notes
3. Click "Create Subscription"

You'll receive a unique webhook URL like:
```
http://localhost:3000/api/v1/webhooks/{subscription-id}
```

### 3. View Events

Click "View Events" on any subscription to see:
- Real-time webhook delivery status
- Delivery attempts and timestamps
- Success/failure responses
- Error messages (if any)

Events update **instantly** via WebSocket when new webhooks are processed.

### 4. Cancel Subscription

Click "Cancel" on any subscription to soft-delete it. This will:
- Stop receiving new webhooks
- Retain historical event data
- Show a confirmation dialog before deletion

## Project Structure

```
src/
├── api/
│   └── endpoints.ts       # API endpoint utilities
├── components/
│   └── ui/                # Reusable UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       └── ConfirmationDialog.tsx
├── features/
│   ├── auth/              # Authentication pages
│   │   ├── LoginPage.tsx
│   │   └── SignupPage.tsx
│   └── dashboard/         # Dashboard and subscriptions
│       ├── DashboardPage.tsx
│       ├── SubscriptionEventsPage.tsx
│       ├── api.ts
│       └── components/
│           ├── SubscriptionList.tsx
│           └── EventsTable.tsx
├── lib/
│   ├── axios.ts           # Axios instance with interceptors
│   └── socket.ts          # Socket.io client configuration
├── types/
│   └── subscription.ts    # TypeScript type definitions
├── App.tsx                # Main app with routing
└── main.tsx               # Application entry point
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Real-time Features

### WebSocket Connection

The frontend automatically connects to Socket.io when viewing subscription events:

1. **Connection**: Established when opening the events page
2. **Authentication**: Uses JWT from cookies
3. **Room Joining**: Subscribes to `subscription:{id}` room
4. **Disconnection**: Automatic cleanup when leaving the page

### Event Updates

When a webhook is processed, you'll see:
- New events appear at the top of the list
- Status updates (SUCCESS/FAILED)
- Delivery timestamps
- Error messages (if delivery failed)

**No page refresh needed** - updates are instant!

## Testing the Frontend

### With Backend Running

**Terminal 1**: Start backend
```bash
cd ../spenza-backend
npm run dev
```

**Terminal 2**: Start test server
```bash
cd ../spenza-backend
npm run test-server
```

**Terminal 3**: Start frontend
```bash
npm run dev
```

**Terminal 4**: Emit webhooks
```bash
cd ../spenza-backend
npm run emit-webhooks
```

Now:
1. Open `http://localhost:5173`
2. Register/Login
3. Create a subscription with target URL: `http://localhost:8080/webhook`
4. Click "View Events"
5. Watch events appear in real-time as webhooks are emitted!

## Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Production Environment Variables

Create a `.env.production` file:

```env
VITE_API_URL=https://your-backend-domain.com/api/v1
```

### Deployment

The built static files can be deployed to:
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy --prod`
- **AWS S3 + CloudFront**
- **Any static hosting service**

**Important**: Ensure your backend's `CORS_ORIGIN` environment variable includes your frontend's production URL.

## Troubleshooting

### API Connection Issues

```bash
# Check if backend is running
curl http://localhost:3000/api/v1/health

# Verify VITE_API_URL in .env
cat .env
```

### WebSocket Connection Issues

1. **Check browser console** for connection errors
2. **Verify backend logs** show "Socket.io initialized with authentication"
3. **Ensure cookies are enabled** (JWT stored in cookies)
4. **Check CORS settings** in backend `.env`:
   ```env
   CORS_ORIGIN=http://localhost:5173
   ```

### Authentication Issues

- Clear browser cookies and try logging in again
- Check that backend JWT secrets are configured
- Verify access token hasn't expired (15min default)

## Technology Stack

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **TanStack Query**: Server state management
- **Socket.io Client**: Real-time WebSocket connection
- **Axios**: HTTP client with interceptors
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Type safety

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT
