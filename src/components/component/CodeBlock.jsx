"use client"
import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; 

export default function Codeblock({ code }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre>
      <code className="language-javascript">
        {code}
      </code>
    </pre>
  );
};


