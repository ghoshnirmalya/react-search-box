import { FC } from "react";
import { StyledDropdown } from "./styles";

interface IProps {
  onClick: any;
  matchedRecords: [
    {
      item: {
        key: string;
        value: string;
      };
    }
  ];
  dropdownHoverColor: string;
  dropdownBorderColor: string;
}

const Dropdown: FC<IProps> = ({
  onClick,
  matchedRecords = [],
  dropdownBorderColor,
  dropdownHoverColor,
}) => {
  return (
    <StyledDropdown
      className="react-search-box-dropdown"
      dropdownHoverColor={dropdownHoverColor}
      dropdownBorderColor={dropdownBorderColor}
    >
      <ul>
        {matchedRecords.map((record) => {
          return (
            <li
              key={record.item.key}
              className="react-search-box-dropdown-list-item"
              onClick={() => onClick(record)}
            >
              {record.item.value}
            </li>
          );
        })}
      </ul>
    </StyledDropdown>
  );
};

export default Dropdown;
