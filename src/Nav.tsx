import { memo } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const options = new Set<string>;
options.add("database");


const tags = new Set<string>;
tags.add("database");
tags.add("redis");
tags.add("sqlserver");
tags.add("database");


const Nav = () => {
  return (<>

    {/* <div style={{ position: 'absolute', left: 10, top: 10, zIndex: 4 }}> */}
    {/* <div> */}


    <Autocomplete
      options={Array.from(tags)}
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
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Favorites" />
      )}
    />
    {/* </div> */}
    {/* </div> */}
  </>);
}

Nav.displayName = "NavNode";

export default memo(Nav);