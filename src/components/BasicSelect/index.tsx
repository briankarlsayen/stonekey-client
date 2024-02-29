import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";

type BasicSelectProps = {
  list: List[];
} & SelectProps;

type List = {
  value: string;
  text: string;
};

const BasicSelect = (props: BasicSelectProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Select {...props}>
        {props.list.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BasicSelect;
