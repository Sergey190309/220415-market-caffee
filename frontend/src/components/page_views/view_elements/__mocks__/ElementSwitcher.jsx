const ElementSwitcher = ({ viewName, structure, lng }) => {
  // console.log('mockElementSwitcher, viewName ->', viewName)
  return (
    <div data-testid='ElementSwitcher'>
      ElementSwitcher
      {viewName}
      {lng}
    </div>
  )
}

export default ElementSwitcher
