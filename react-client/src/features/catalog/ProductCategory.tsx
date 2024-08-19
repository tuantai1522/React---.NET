import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  FormLabel,
} from "@mui/material";
import { useState } from "react";

interface Props {
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}

const ProductCategory = ({ items, checked, onChange }: Props) => {
  const [checkedItems, setCheckedItems] = useState(checked || []);

  const handleChecked = (value: string) => {
    const currentIndex = checkedItems.findIndex((item) => item === value);
    let newChecked: string[] = [];

    if (currentIndex === -1) newChecked = [...checkedItems, value];
    else newChecked = checkedItems.filter((i) => i !== value);

    setCheckedItems(newChecked);
    onChange(newChecked);
  };

  return (
    <>
      <Paper sx={{ mb: 2, p: 2 }}>
        <FormLabel component="legend">Category</FormLabel>

        <FormGroup>
          {items.map((item) => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  checked={checkedItems.indexOf(item) !== -1}
                  onClick={() => handleChecked(item)}
                />
              }
              label={item}
            />
          ))}
        </FormGroup>
      </Paper>
    </>
  );
};

export default ProductCategory;
