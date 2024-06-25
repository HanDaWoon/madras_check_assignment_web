import { signIn } from "@/auth";

export function LoginForm() {
  return (
    <form
      className="w-full md:w-1/3 flex flex-col items-center"
      action={async (formData) => {
        "use server";
        await signIn("credentials", {
          redirectTo: "/",
          email: formData.get("email"),
          password: formData.get("password"),
        });
      }}
    >
      <h1 className="text-center text-2xl font-bold text-gray-600 mb-6">
        LOGIN
      </h1>
      <h2 className="mb-6">
        Example User
        <br />
        email: admin@example.com
        <br />
        password: 12345
        <br />
      </h2>
      <div className="w-3/4 mb-6">
        <input
          type="email"
          name="email"
          id="email"
          className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
          placeholder="User Name or Email ID"
        />
      </div>
      <div className="w-3/4 mb-6">
        <input
          type="password"
          name="password"
          id="password"
          className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 "
          placeholder="Password"
        />
      </div>
      <div className="w-3/4 mt-4">
        <button
          type="submit"
          className="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </form>
  );
}
