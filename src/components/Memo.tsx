import { useState, useEffect } from "react";

type MemoTypeProps = {
  name: string
  message: string
  from: string
}

const Memo = (props: any) => {
  const [memos, setMemos] = useState([]);
  const { contract } = props.state;

  const getMemos = async () => {
    const memos = await contract.getMemos();
    setMemos(memos);
  };

  useEffect(() => {
    contract && getMemos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  return (
    <>
      <div className="mt-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Memo List
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the memos in your contract
            </p>
          </div>
        </div>
        <div className="mt-2 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Message
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      From
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {memos.map((item:MemoTypeProps, index) => (
                    <tr key={index}>
                      <td>{ item?.name }</td>
                      <td>{ item?.message }</td>
                      <td>{ item?.from }</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Memo;
