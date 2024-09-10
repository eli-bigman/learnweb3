import React from 'react';
import Sidebar from '@/components/component/Sidebar';
import Header from "@/components/component/Header";
import Namespace from "@/components/component/namespace"

const namespacePage = () => {
  return (
    <>
        <Header/>
        <Sidebar />
        <Namespace/>
    </>
  );
};

export default namespacePage;

