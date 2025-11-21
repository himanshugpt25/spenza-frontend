import { Navigate, Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './components/layout/PrivateRoute'
import { AuthPage } from './features/auth/AuthPage'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { SubscriptionEventsPage } from './features/dashboard/SubscriptionEventsPage'

export const App = () => (
  <Routes>
    <Route path="/" element={<AuthPage initialMode="login" />} />
    <Route path="/signup" element={<AuthPage initialMode="signup" />} />
    <Route element={<PrivateRoute />}>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route
        path="/dashboard/subscriptions/:id"
        element={<SubscriptionEventsPage />}
      />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)
