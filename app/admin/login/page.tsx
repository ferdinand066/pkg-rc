import Layout from "@/components/layout/Layout";
import Messages from "./messages";

export default function Login() {
  return (
    <Layout>
      <div className="py-4">
        <form
          className="flex flex-col justify-center flex-1 w-full gap-2 text-foreground"
          action="/auth/sign-in"
          method="post"
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="px-4 py-2 mb-6 border rounded-md bg-inherit"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="px-4 py-2 mb-6 border rounded-md bg-inherit"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <div className="flex flex-col justify-end gap-4 sm:flex-row">
            <button className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-36">
              Sign In
            </button>
            <button
              formAction="/auth/sign-up"
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-36"
            >
              Sign Up
            </button>
          </div>
          <Messages />
        </form>
      </div>
    </Layout>
  );
}
