"use client";

import startCase from 'lodash/startCase';

type TableProps = {
  title: string[];
  content: object[];
};

export default function Table({ title, content }: TableProps) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {title.map((str, index) =>{
                    if (str === 'action'){
                      return (
                        <th key={index} scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Action</span>
                        </th>
                      );
                    }
                    return (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        {startCase(str)}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {content.map((c, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {title.map((t, idx) => {
                      return (
                        <td
                          key={idx}
                          className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                        >
                          {(c as any)[t]}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
