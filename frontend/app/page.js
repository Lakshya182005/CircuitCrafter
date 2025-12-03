"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu, ArrowRight, Zap, Layers, Share2 } from "lucide-react";
import { Button } from "@/components/ui/forms/button";

const features = [
  {
    icon: Zap,
    title: "Real-time Simulation",
    description: "See your circuits come alive instantly with real-time signal propagation.",
  },
  {
    icon: Layers,
    title: "Drag & Drop Components",
    description: "Build complex circuits intuitively with our modern component library.",
  },
  {
    icon: Share2,
    title: "Share & Collaborate",
    description: "Export, share, and explore circuits from the community gallery.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 circuit-grid opacity-20" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow" />

      {/* Header */}
      <header className="relative z-10 container flex items-center justify-between py-6 px-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 group-hover:border-primary/50 transition-all duration-300">
            <Cpu className="h-6 w-6 text-primary" />
            <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            Circuit<span className="text-primary">Crafter</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/sign-in">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 container px-4">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary mb-8"
            >
              <Zap className="h-4 w-4" />
              Digital Circuit Design Made Simple
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Design circuits{" "}
              <span className="text-gradient">visually</span>
            </h1>

            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Build, simulate, and share digital logic circuits with an intuitive drag-and-drop interface.
              Perfect for learning, prototyping, and teaching.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
            >
              <Link href="/sign-up">
                <Button size="lg" className="gap-2 text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow">
                  Start Building
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/gallery">
                <Button variant="outline" size="lg" className="text-base">
                  Explore Gallery
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-4xl"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="glass-panel p-6 text-left group"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
