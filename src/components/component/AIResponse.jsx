import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AIResponse() {
  return (
    <section className="col-span-1 lg:col-span-1">
      <Card>
        <CardHeader>
          <CardTitle>Explain with ORA AI</CardTitle>
          <CardDescription>Ask Ora Ai any question about the code and get a response</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="prose">
              <p>The AI has not responded yet. Please enter a message and click "Send" to get a response.</p>
            </div>
            <div className="flex gap-2">
              <Textarea placeholder="Enter your message" rows={3} />
              <Button>Send</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}