import { AppProvider } from '@/lib/app-context'
import { Footer } from '@/components/layout/footer'

// All /dashboard/* pages share this layout — footer is always visible
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      {/* Center content, cap at 2xl */}
      <div className="min-h-screen flex flex-col items-center bg-background">
        <div className="w-full max-w-2xl flex-1 pb-16">{children}</div>
        <div className="w-full max-w-2xl">
          <Footer />
        </div>
      </div>
    </AppProvider>
  )
}
