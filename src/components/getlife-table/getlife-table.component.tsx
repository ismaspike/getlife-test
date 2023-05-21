import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { GetlifeTableProps } from './getlife-table.model';

export const GetlifeTable = (props: GetlifeTableProps) => {

	/** STATES */
	const [dataSource, setDataSource] = useState(props?.dataSource)
	
	/** END OF STATES */
	
	/** EFFECTS */
	useEffect(() => {
		if (props?.showRows) {
			const tableData = [];
			for (let a = 0; a < props?.showRows; a++) {
				if (props?.dataSource[a]) {
					tableData.push(props?.dataSource[a]);
				}
			}
			setDataSource(tableData)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props?.showRows])

	/** END OF EFFECTS */

	/** RETURN */
	
	return <div className="getlife-table">
		<Table dataSource={dataSource} columns={props?.columns} pagination={false} size={"small"} />;
	</div>


}
