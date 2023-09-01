type SubmitButtonGroupProps = {
  text: string;
  reset: () => void;
  loading: boolean;
}

export default function SubmitButtonGroup({ text, reset, loading }: SubmitButtonGroupProps) {
  return (
    <>
      <button
        type="button"
        onClick={() => reset()}
        disabled={loading}
        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-36"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-36"
      >
        {text}
      </button>
    </>
  );
}
