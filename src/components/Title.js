import React from 'react';

const Title = ({ name, title }) => {
  return (
    <div className='col-10 mx-auto my-3 text-center text-title'>
      <h1 className='text-uppercase font-weight-bold'>
        {name} <strong className='text-blue'>{title}</strong>
      </h1>
    </div>
  );
};

export default Title;
