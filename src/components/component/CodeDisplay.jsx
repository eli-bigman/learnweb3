"use client"
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Codeblock  from "@/components/component/CodeBlock";

export default function CodeDisplay({ code }) {
  return (
    <section className="col-span-1 lg:col-span-1">
      <Card>
        <CardHeader>
          <CardTitle>Code Display</CardTitle>
          <CardDescription>View the code for the Playground app</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <Textarea
            readOnly
            rows={15}
            value={code}
          /> */}

          <Codeblock code={code} />
        </CardContent>
      </Card>
    </section>
  );
}