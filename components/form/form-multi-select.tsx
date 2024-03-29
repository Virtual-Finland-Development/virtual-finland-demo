import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import styled from 'styled-components';
import { MultiSelect } from 'suomifi-ui-components';

const StyledMultiSelect = styled(MultiSelect)<{
  $fullWidthChipList?: boolean;
}>`
  ${({ $fullWidthChipList }) =>
    $fullWidthChipList &&
    `
width: 100% !important;

.fi-filter-input_functionalityContainer {
  max-width: 290px !important;
}
`}
`;

interface SelectInputControllerProps<T extends FieldValues> {
  name: Path<T>;
  rules?: RegisterOptions;
  control: Control<T>;
}

interface Props<T extends FieldValues> extends SelectInputControllerProps<T> {
  labelText: string;
  hintText?: string;
  optionalText?: string;
  showStatusText?: boolean;
  items: { labelText: string; uniqueItemId: string; disabled?: boolean }[];
  fullWidthChipList?: boolean;
}

export default function FormMultiSelect<T extends FieldValues>(
  props: Props<T>
) {
  const {
    name,
    rules,
    control,
    labelText,
    hintText,
    optionalText,
    showStatusText = true,
    items,
    fullWidthChipList = false,
  } = props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <StyledMultiSelect
          labelText={labelText}
          hintText={hintText}
          optionalText={optionalText}
          noItemsText={undefined}
          visualPlaceholder="Type to search"
          ariaOptionsAvailableText="options available"
          itemAdditionHelpText=""
          ariaSelectedAmountText="option selected"
          ariaChipActionLabel="Remove"
          ariaOptionChipRemovedText="removed"
          // removeAllButtonLabel="Remove all selected"
          chipListVisible
          status={error && 'error'}
          statusText={showStatusText && error ? error.message : ''}
          items={items}
          defaultSelectedItems={
            value && items.filter(item => value.indexOf(item.uniqueItemId) > -1)
          }
          onItemSelectionsChange={selected => {
            onChange(selected.map(s => s.uniqueItemId));
          }}
          $fullWidthChipList={fullWidthChipList}
        />
      )}
    />
  );
}
