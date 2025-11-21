import { useState } from 'react'
import type { FormEvent } from 'react'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useSignupMutation } from './hooks/useAuthMutations'
import { getErrorMessage } from '../../utils/errorMessage'

type SignupPageProps = {
  onSuccess?: () => void
}

export const SignupPage = ({ onSuccess }: SignupPageProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const signupMutation = useSignupMutation()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    signupMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          onSuccess?.()
        },
      },
    )
  }

  const errorMessage = signupMutation.isError
    ? getErrorMessage(signupMutation.error, 'Unable to create account')
    : null

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Input
          label="Work email"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={8}
          required
        />
      </div>
      {errorMessage ? (
        <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
          {errorMessage}
        </p>
      ) : null}
      <Button type="submit" loading={signupMutation.isPending}>
        Create account
      </Button>
    </form>
  )
}

