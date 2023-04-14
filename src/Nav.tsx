import { memo } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteChangeReason } from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { getTags, pollData, changeVisibilityByTab } from "./initialNodes"
import { useCallback, useEffect, useState } from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

let tags: Map<string, boolean>;

const Nav = () => {
  console.log("teste");
  const fetchData = async () => {
    await pollData();
  };

  fetchData();

  return (<>

    <Autocomplete
      options={Array.from(tags.keys())}
      style={{ width: 300 }}
      renderInput={(params) =>
        <TextField {...params} label="Visible Tags" variant="outlined" />}
    />

    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={Array.from(tags)}
      disableCloseOnSelect
      // getOptionLabel={(option) => option.title}
      // renderOption={(props, option, { selected }) => (
      //   <li {...props}>
      //     <Checkbox
      //       icon={icon}
      //       checkedIcon={checkedIcon}
      //       style={{ marginRight: 8 }}
      //       checked={selected}
      //     />
      //     {option.title}
      //   </li>
      // )}
      onChange={(value: any | null, reason : any) => {
        if (value == null) { return; }
        if (reason == 'selectOption') {
          changeVisibilityByTab(value, false);
        } else if ('removeOption') {
          changeVisibilityByTab(value, true);
        }
      }}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Favorites" />
      )}
    />
  </>);
}

Nav.displayName = "NavNode";

export default memo(Nav);