import { CSSProperties, FC } from "react";
import { StyledDropdown } from "./styles";

// the prototype of fuse.js's search result's match
// only work when includeMatches == true
interface Match {
  indices: number[][];
  key: string;
  value: string;
}

interface IProps {
  onClick: any;
  matchedRecords: [
    {
      item: {
        key: string;
        value: string;
      };
      matches?: Match[];
    }
  ];
  dropdownHoverColor: string;
  dropdownBorderColor: string;
  highlightStyle?: CSSProperties;
}

interface ItemProps {
  /*
   * the content
   */
  value: string;
  /*
   * the matched places, to be highlighted
   */
  matches?: Match[];
  /*
   * the highlighted span's style
   * if matches is undefined or empty, this won't work
   */
  highlightStyle?: CSSProperties;
}

const DropDownItem: FC<ItemProps> = ({ value, matches, highlightStyle }) => {
  if (matches === undefined) {
    return <div>value</div>;
  } else {
    const parts: JSX.Element[] = [];
    let lastIndex = 0;

    let rawIndexes = matches.map((item) => item.indices).flat();
    let indexes = mergeIntervals(rawIndexes);
    indexes.forEach((arr, index) => {
      let start = arr[0];
      let end = arr[1];
      // Add non-highlighted text before the current highlighted text
      if (start > lastIndex) {
        parts.push(
          <span key={`text-before-${index}`}>
            {value.substring(lastIndex, start)}
          </span>
        );
      }
      // Add highlighted text
      parts.push(
        <span key={`highlight-${index}`} style={highlightStyle}>
          {value.substring(start, end + 1)}
        </span>
      );
      lastIndex = end + 1;
    });

    // Add any remaining non-highlighted text after the last highlighted section
    if (lastIndex < value.length) {
      parts.push(<span key="text-after">{value.substring(lastIndex)}</span>);
    }

    return <div>{parts}</div>;
  }
};

// merge intervals of spans
const mergeIntervals = (intervals: number[][]): number[][] => {
  if (!intervals.length) return [];

  // Sort intervals by their start values
  intervals.sort((a, b) => a[0] - b[0]);

  const merged: number[][] = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const prev = merged[merged.length - 1];
    const current = intervals[i];

    if (current[0] <= prev[1] + 1) {
      // Check if current interval overlaps or is consecutive
      // Merge intervals by updating the end value of the previous interval
      prev[1] = Math.max(prev[1], current[1]);
    } else {
      merged.push(current);
    }
  }

  return merged;
};

const Dropdown: FC<IProps> = ({
  onClick,
  matchedRecords = [],
  dropdownBorderColor,
  dropdownHoverColor,
  highlightStyle,
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
              tabIndex={0}
              onKeyDown={(e) => {
                if (["Space", "Enter"].includes(e.code)) {
                  onClick(record);
                }
              }}
              className="react-search-box-dropdown-list-item"
              onClick={() => onClick(record)}
            >
              <DropDownItem
                value={record.item.value}
                matches={record.matches}
                highlightStyle={highlightStyle}
              />
            </li>
          );
        })}
      </ul>
    </StyledDropdown>
  );
};

export default Dropdown;
