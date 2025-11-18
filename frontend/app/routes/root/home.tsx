import React from "react";
import type { Route } from "../../+types/root";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskHive" },
    { name: "description", content: "Welcome to TaskHive!!" },
  ];
}

function Homepage() {
  return (
    <div className="w-full h-screen flex items-center justify-center gap-4">
      <Link to="/sign-in">
        <Button>Login</Button>
      </Link>
      <Link to="/sign-up">
        <Button variant="outline">Sign up</Button>
      </Link>
    </div>
  );
}

export default Homepage;
