import React from 'react';
import Sidebar from '@/components/component/Sidebar';
import Header from "@/components/component/Header";
import Zksync from "@/components/component/zksync";

const ZksyncPage = () => {
  return (
    <div>
      <Header/>
      <Sidebar/>
      <Zksync/>
    </div>
  );
};

export default ZksyncPage;

