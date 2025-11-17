import React from "react";
import type { Route } from "../../+types/root";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarImage } from "~/components/ui/avatar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskHive" },
    { name: "description", content: "Welcome to TaskHive!!" },
  ];
}

function Homepage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Button>Click me</Button>
    </div>
  );
}

export default Homepage;
