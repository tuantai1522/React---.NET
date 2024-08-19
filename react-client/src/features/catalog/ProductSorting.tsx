import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";

interface Props {
  sortOptions: any[];
  onChange: (event: any) => void;
  selectedValue: string;
}

const ProductSorting = ({ sortOptions, onChange, selectedValue }: Props) => {
  return (
    <>
      <Paper sx={{ mb: 2, p: 2 }}>
        <FormLabel component="legend">Sorting</FormLabel>
        <FormGroup>
          <RadioGroup onChange={onChange} value={selectedValue}>
            {sortOptions.map(({ value, name }) => (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio />}
                label={name}
              />
            ))}
          </RadioGroup>
        </FormGroup>
      </Paper>
    </>
  );
};

export default ProductSorting;
