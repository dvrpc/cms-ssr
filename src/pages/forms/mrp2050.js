import React, { useState, useEffect } from 'react';
import ReusableForm from '../../components/forms/ReusableForm';
import formConfig from '../../configs/forms/mrp2050.json';

const MRPIntakeForm = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <ReusableForm formConfig={formConfig} />
    </div>
  );
};

export default MRPIntakeForm;
