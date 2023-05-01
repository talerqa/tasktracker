import React from 'react';

type ComponentPropsType = {
  tasks: any
  title: string
}


const Component = (props: ComponentPropsType) => {
  console.log(props.title)
  console.log(props.tasks)
  return (
    <div>

    </div>
  );
};

export default Component;