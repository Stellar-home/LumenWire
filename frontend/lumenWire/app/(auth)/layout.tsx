import { AppProvider } from '@/lib/app-context'

// Auth pages share the root layout but have no footer.
// They are centered and max-width constrained.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col items-center justify-start bg-background">
        <div className="w-full max-w-2xl">{children}</div>
      </div>
    </AppProvider>
  )
}
