"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

interface NavbarProps {
  session: Session | null;
}

export const Navbar = ({ session }: NavbarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="relative w-[150px] h-[40px]">
            <Image
              src="/logo.svg"
              alt="HireEase"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Auth Section */}
          <div>
            {session ? (
              <div className="flex items-center gap-2">
                <Avatar
                  onClick={handleMenu}
                  className="cursor-pointer"
                  src={session.user?.image || ""}
                  alt={session.user?.name || "User"}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button
                variant="contained"
                onClick={() => signIn("google")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
