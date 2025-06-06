"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, X, User, Settings, LogOut } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, profile, signOut } = useAuth()
  const pathname = usePathname();
  const { toast } = useToast();
  const router = useRouter();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Alumni", href: "/alumni" },
    { name: "About", href: "/about" },
  ]

  const handleSignOut = async () => {
    await signOut();
    toast({ title: "Signed out", description: "You have been signed out successfully." });
    window.location.href = "/";
  };

  const handleSignUp = () => {
    router.push("/auth/register");
    router.refresh();
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 h-16">
              <div className="flex items-center h-full">
                <Image
                  src="/images/sharda-logo.png"
                  alt="Sharda University Logo"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain mr-4"
                />
                <div className="flex flex-col ml-1 justify-center">
                  <span className="text-xs font-bold text-gray-900 leading-tight">Sharda University</span>
                  <span className="text-[10px] text-blue-400 font-medium leading-tight">Alumni Portal</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-800 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${pathname === item.href ? 'text-blue-700 font-bold underline underline-offset-4' : ''}`}
                tabIndex={0}
                aria-label={item.name}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.profile_image_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.email || user?.id}`} alt={profile?.first_name} />
                      <AvatarFallback>
                        {profile?.first_name?.[0]}
                        {profile?.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">
                        {profile?.first_name} {profile?.last_name}
                      </p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button onClick={handleSignUp}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-800 hover:text-blue-700 block px-3 py-2 text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${pathname === item.href ? 'text-blue-700 font-bold underline underline-offset-4' : ''}`}
                tabIndex={0}
                aria-label={item.name}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/auth/login"
              className="text-gray-800 hover:text-blue-700 block px-3 py-2 text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              tabIndex={0}
              aria-label="Sign In"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="text-gray-800 hover:text-blue-700 block px-3 py-2 text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              tabIndex={0}
              aria-label="Sign Up"
              onClick={() => { setIsOpen(false); handleSignUp(); }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
