import React, { useState } from 'react';

import { Loader } from '../../common/Loader';
import { useLoader } from '../../utils/hooks';
import CreateForm from '../CreateForm/CreateForm';
import { LinkPrimary } from '../LinkPrimary';
import './Table.scss';

const Table = ({ namesTitlesCells = [{}], items = [], title, ComponentTr, addItem, editItem, deleteItem, type }) => {
  console.log(items);

  if (useLoader()) return <Loader />;
  return (
    <section className="pages">
      <h2 className="title-table">{title}</h2>
      <div className="table__container-form">
        <CreateForm type={type} submitFunc={addItem} />
      </div>
      <table className="table">
        <tbody>
          <tr>
            {namesTitlesCells.map((cell) => (
              <th key={cell.name} width={cell?.width && cell.width}>
                {cell.name}
              </th>
            ))}
          </tr>
          <tr>
            {namesTitlesCells.map((cell) => (
              <td key={cell.name} width={cell?.width && cell.width}></td>
            ))}
          </tr>
          {items.map((item, index) => (
            <ComponentTr key={index} {...item} editItem={editItem} deleteItem={deleteItem} />
          ))}
        </tbody>
      </table>
    </section>
  );
};
export default Table;
