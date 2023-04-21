import { useForm, SubmitHandler } from "react-hook-form";
import { ethers } from "ethers";
import Loading from "./Loading";
import { useState } from "react";
import Router, { useRouter } from "next/router";

type FromtTypeProps = {
  name: string;
  message: string;
};

export default function BuyCoffee(props: any) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FromtTypeProps>();
  const onSubmit: SubmitHandler<FromtTypeProps> = async (data) => {
    const { contract } = props.state;
    setLoading(true);

    const { name, message } = data;
    const value = { value: ethers.utils.parseEther("0.01") };
    const transaction = await contract.buyCoffee(name, message, value);
    await transaction.wait();
    setLoading(false);

    router.reload();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center items-center gap-4">
        <label htmlFor="">Name:</label>
        <input
          {...register("name", { required: true })}
          placeholder="Name"
          className=" rounded border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
        />

        <label htmlFor="">Message:</label>
        <input
          {...register("message", { required: true })}
          placeholder="Message"
          className="rounded border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
        />
        

        <div className="flex justify-between items-center gap-2">
          <button
            type="submit"
            className="inline-flex cursor-pointer px-8 py-2.5 rounded bg-blue-600 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2"
          >
            {loading && <Loading />}
            Pay
          </button>
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            0.01 ETH
          </span>
        </div>
      </div>
    </form>
  );
}
