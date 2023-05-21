import React, {useEffect} from 'react'; 
import { GetlifeTableProps } from './getlife-table.model';

export const GetlifeTable = (props: GetlifeTableProps) => {
  useEffect(()=> {
    console.log(props);
  },[])
   return <h1>{props.name}</h1>
}
  