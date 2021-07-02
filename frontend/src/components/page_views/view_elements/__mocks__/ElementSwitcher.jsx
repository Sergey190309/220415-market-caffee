import React from 'react';

const ElementSwitcher = ({ structure, viewName, lng }) => {
  // useEffect(() => {
  //   // console.log('useEffect')
  // })

  const keys = Object.keys(structure)
  // console.log('ElementSwitcher, keys ->', keys)
  const _output = keys.map((key, index) => {
    const _item = Object.entries(structure[key])
    // console.log('mockElementSwitcher, structure ->', structure[key])
    return (
      <div key={key} data-testid={key}>
        {_item}
      </div>
    )
  })
  return (
    <div data-testid='ElementSwitcher'>
      ElementSwitcher
      {_output}
      {viewName}
      {lng}
    </div>
  )
};

export default ElementSwitcher;
