import Link from 'next/link';
import { BiRightArrowAlt, BiLock, BiLineChart, BiTransfer, BiStar } from 'react-icons/bi';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">₹</span>
            </div>
            <span className="text-xl font-bold">PayApp</span>
          </div>
          <div className="flex gap-4">
            <Link href="/auth/login" className="px-5 py-2.5 rounded-xl font-medium text-muted-foreground hover:text-foreground transition-colors">
              Login
            </Link>
            <Link href="/auth/register" className="px-5 py-2.5 rounded-xl font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Get ₹1000 free on signup
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Your Digital{' '}
              <span className="text-primary">Wallet</span>{' '}
              for Instant Transfers.
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Send money instantly using unique PayIDs. Add friends, chat, and transfer funds securely—all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 group">
                Get Started Free
                <BiRightArrowAlt className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/auth/login" className="px-8 py-4 rounded-xl bg-card text-foreground border border-border font-medium text-lg hover:bg-accent transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Plan For Every Milestone.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Achieve your financial objectives with automated recommendations and tailored advice.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <BiTransfer className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Transfers</h3>
              <p className="text-muted-foreground">Send money to anyone using just their 5-digit PayID. Fast, secure, and fee-free.</p>
            </div>

            <div className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <BiLineChart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Analytics</h3>
              <p className="text-muted-foreground">Track your spending patterns with detailed charts and month-wise breakdowns.</p>
            </div>

            <div className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <BiLock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Bank-Grade Security</h3>
              <p className="text-muted-foreground">Your data and money are protected with state-of-the-art encryption.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Create your account in seconds and get ₹1000 bonus to try instant transfers.
          </p>
          <Link href="/auth/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-all">
            Create Free Account
            <BiRightArrowAlt className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PayApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
