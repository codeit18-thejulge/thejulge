interface TableHeaderProps {
  colTitle: { id: string; title: string }[];
}
// 열 제목
const TableHeader = ({ colTitle }: TableHeaderProps) => {
  return (
    <tr>
      {colTitle.map((item) => (
        <th key={item.id} scope="col">
          {item.title}
        </th>
      ))}
    </tr>
  );
};

export default TableHeader;
