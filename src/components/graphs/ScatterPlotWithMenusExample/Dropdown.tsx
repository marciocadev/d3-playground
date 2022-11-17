interface DropdownOptions {
  value: string,
  label: string
}
interface DropdownProps {
  options: DropdownOptions[],
  id: string,
  selectedValue: string,
  onSelectedValueChange: any
}

export const Dropdown = (props: DropdownProps) => {
  return (
    <>
      <select id={props.id}
        value={props.selectedValue}
        onChange={event => props.onSelectedValueChange(event.target.value)}>
        {
          props.options.map((option: DropdownOptions) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))
        }
      </select>
    </>
  )
}
