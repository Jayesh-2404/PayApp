import Link from 'next/link';
import { BiRightArrowAlt, BiLock, BiLineChart, BiTransfer, BiCheckCircle } from 'react-icons/bi';

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
            <span className="text-xl font-bold tracking-tight">PayApp</span>
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
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-xs font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Instant Transfers Live
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            Money made <br />
            <span className="text-primary">simple.</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            The minimal digital wallet for the modern generation. Send, receive, and track your finances without the clutter.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/register" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/20">
              Create Free Account
              <BiRightArrowAlt className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-6 px-4">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <BiCheckCircle className="text-primary" /> No hidden fees
              </span>
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <BiCheckCircle className="text-primary" /> Secure
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BiTransfer className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">Lightning Fast</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience transfers that happen in milliseconds. No waiting, no delays, just instant settlement.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BiLineChart className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">Live Analytics</h3>
              <p className="text-muted-foreground leading-relaxed">
                Watch your balance update in real-time. Visualize your spending habits with clean, intuitive charts.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BiLock className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">Bank-Grade Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                Enterprise-level encryption keeps your data and money safe. Your peace of mind is our priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2 text-foreground">₹1K</div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Signup Bonus</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2 text-foreground">0%</div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Transaction Fees</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2 text-foreground">0.1s</div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Latency</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2 text-foreground">24/7</div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Join the financial revolution.</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Start your journey with PayApp today and get ₹1000 instantly credited to your wallet.
          </p>
          <Link href="/auth/register" className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl bg-foreground text-background font-bold text-lg hover:bg-foreground/90 transition-all">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-muted-foreground">
          <p className="text-sm font-mono">&copy; {new Date().getFullYear()} PayApp Systems.</p>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
