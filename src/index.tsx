import Fuse from "fuse.js";
import React, { ChangeEvent, FC, ReactNode, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Dropdown from "./dropdown";
import InputBox from "./input";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

type Record = { item: { key: string; value: string } };

interface IProps {
  placeholder: string;
  data: { key: string; value: string }[];
  fuseConfigs?: {};
  autoFocus?: boolean;
  onSelect: (record: Record) => void;
  onFocus?: () => void;
  onChange: (value: string) => void;
  inputFontColor?: string;
  inputBorderColor?: string;
  inputFontSize?: string;
  inputHeight?: string;
  inputBackgroundColor?: string;
  dropdownHoverColor?: string;
  dropdownBorderColor?: string;
  clearOnSelect?: boolean;
  leftIcon?: ReactNode;
  iconBoxSize?: number | string;
}

const ReactSearchBox: FC<IProps> = ({
  placeholder = "",
  data = [],
  fuseConfigs,
  autoFocus = false,
  onSelect,
  onFocus,
  onChange,
  inputBackgroundColor = "#fff",
  inputFontColor = "#000",
  inputBorderColor = "#cacaca96",
  inputFontSize = "14px",
  inputHeight = "40px",
  dropdownHoverColor = "#ccc",
  dropdownBorderColor = "#cacaca96",
  clearOnSelect = false,
  leftIcon,
  iconBoxSize = "24px",
}) => {
  const [matchedRecords, setMatchedRecords] = useState<any>([]);
  const [value, setValue] = useState<string>("");
  const [showDropdown, setDropdownVisibility] = useState<boolean>(false);

  /**
   * These configs are from Fuse plugin. Check out http://fusejs.io/
   * for more details.
   */
  const defaultFuseConfigs = {
    /**
     * At what point does the match algorithm give up. A threshold of 0.0
     * requires a perfect match (of both letters and location), a threshold
     * of 1.0 would match anything.
     */
    threshold: 0.05,
    /**
     * Determines approximately where in the text is the pattern expected to be found.
     */
    location: 0,
    /**
     * Determines how close the match must be to the fuzzy location
     * (specified by location). An exact letter match which is distance
     * characters away from the fuzzy location would score as a complete
     * mismatch. A distance of 0 requires the match be at the exact
     * location specified, a distance of 1000 would require a perfect
     * match to be within 800 characters of the location to be found
     * using a threshold of 0.8.
     */
    distance: 100,
    /**
     * When set to include matches, only the matches whose length exceeds this
     * value will be returned. (For instance, if you want to ignore single
     * character index returns, set to 2).
     */
    minMatchCharLength: 1,
    /**
     * List of properties that will be searched. This supports nested properties,
     * weighted search, searching in arrays of strings and objects.
     */
    keys: ["value"],
  };

  /**
     this.Override defaultFuseConfigs with fuseConfigs prop
     */
  const configs = Object.assign({}, defaultFuseConfigs, fuseConfigs);
  const fuse = new Fuse(data, configs);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    /**
     * This function is responsible for checking if any items from the input
     * box's value matches with any item form the 'data' prop. If any item matches,
     * then that matched object is pushed into the 'matchedRecords' state. That
     * state is responsible for populating the dropdown.
     */

    const { value } = e.target;

    /**
     * Check all the values from 'data' array whose 'value' matches with
     * 'value' using Fuse plugin.
     */
    const matchedRecords = fuse.search(value);

    /**
     * Update 'value' state with the value from the input box.
     * Update 'matchedRecords' state with the matched records from the data array.
     */
    setValue(value);
    setMatchedRecords(matchedRecords);

    /**
     * Show the dropdown onChange of the input.
     */
    setDropdownVisibility(true);

    /**
     * Trigger the 'onChange' prop once the input's value changes.
     */
    !!onChange && onChange(value);
  };

  const inputNode = () => {
    /**
     * This function is responsible for rendering the input box.
     * The input box acts as a source of entry for the data from the user.
     * Once the user enters the value, it's checked if that value matches
     * with any value which is present in the 'data' prop. If any value
     * matches with the input, then that matched item appears in the dropdown.
     */

    return (
      <InputBox
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        autoFocus={autoFocus ? autoFocus : false}
        onFocus={onFocus ? onFocus : undefined}
        inputFontColor={inputFontColor}
        inputBorderColor={inputBorderColor}
        inputFontSize={inputFontSize}
        inputHeight={inputHeight}
        inputBackgroundColor={inputBackgroundColor}
        leftIcon={leftIcon}
        iconBoxSize={iconBoxSize}
      />
    );
  };

  const handleDropdownItemClick = (record: Record) => {
    /**
     * This function is responsible for updating the value inside the
     * input box when any dropdown item is clicked.
     *
     * The 'value' state is updated with the clicked record's value.
     */

    if (clearOnSelect) {
      // clear the value rather than input it into the box
      setValue("");
    } else {
      setValue(record.item.value);
    }

    /**
     * Hide the dropdown once any dropdown item is clicked.
     */
    setDropdownVisibility(false);

    /**
     * Trigger the 'onSelect' prop once everything is done if it's passed.
     */
    !!onSelect && onSelect(record);

    /**
     * Trigger the 'onChange' prop since the value of the input box also changes.
     */
    !!onChange && onChange(record.item.value);
  };

  const dropdownNode = () => {
    /**
     * This function is responsible for rendering the dropdown.
     * When any value from the input box matches with any value from the
     * 'data' prop, that matched object from the 'data' array shows up
     * in the dropdown's li. The matched values are stored in the
     * 'matchedRecords' state.
     */

    /**
     * If there is no value present in the input box, then the dropdown
     * shouldn't appear.
     */
    if (!showDropdown) return false;

    return (
      <Dropdown
        matchedRecords={matchedRecords}
        onClick={handleDropdownItemClick}
        dropdownHoverColor={dropdownHoverColor}
        dropdownBorderColor={dropdownBorderColor}
      />
    );
  };

  return (
    <StyledContainer>
      <GlobalStyle />
      {inputNode()}
      {dropdownNode()}
    </StyledContainer>
  );
};

export default ReactSearchBox;
