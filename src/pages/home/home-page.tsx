"use client"

import { useNavigate } from "react-router-dom"
import { ArrowRight, CheckCircle, ListTodo } from "lucide-react"
import { Button } from "../../components/ui/button"

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50">
      {/* Navigation */}
      <header className="border-b bg-white/50 backdrop-blur-sm fixed top-0 w-full z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ListTodo className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">TaskMaster</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/register")}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Organize your tasks with
            <span className="text-primary"> TaskMaster</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            The simple, efficient way to manage your daily tasks. Stay organized, focused, and accomplish more every
            day.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto" onClick={() => navigate("/register")}>
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={() => navigate("/login")}>
              Login to Your Account
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TaskMaster?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CheckCircle className="h-8 w-8 text-primary" />}
              title="Simple & Intuitive"
              description="Easy to use interface that helps you focus on what matters most - your tasks."
            />
            <FeatureCard
              icon={<ListTodo className="h-8 w-8 text-primary" />}
              title="Stay Organized"
              description="Keep your tasks organized with our clean and efficient list management system."
            />
            <FeatureCard
              icon={<ArrowRight className="h-8 w-8 text-primary" />}
              title="Track Progress"
              description="Monitor your progress and celebrate your accomplishments as you complete tasks."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 TaskMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

