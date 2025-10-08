interface TableHeaderProps {
  colTitle: string[];
}

// 열 제목
const TableHeader = ({ colTitle }: TableHeaderProps) => {
  return (
    <tr>
      {colTitle.map((item, index) => (
        <th key={index} scope="col">
          {item}
        </th>
      ))}
    </tr>
  );
};

export default TableHeader;
