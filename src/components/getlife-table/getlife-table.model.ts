import { ITableColumn } from "../../App.model";

export interface GetlifeTableProps {
    columns: ITableColumn[];
    dataSource: Object[];
    showRows?: number;
}