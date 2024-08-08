import { ActionFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { verifyLogin } from "~/models/user.server";
import Header from "~/components/Header";
// Define the type for action data
interface ActionData {
  error?: string;
}

export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");

  // Ensure that formData values are strings
  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Invalid form data" };
  }

  try {
    // Use the verifyLogin function to check credentials
    const user = await verifyLogin(email, password);
    if (!user) {
      return { error: "Invalid email or password" };
    }
    // Redirect to a success page or authenticated route
    return redirect("/");
  } catch (error) {
    console.error(error);
    return { error: "Login failed" };
  }
};

export default function Login() {
  // Cast actionData to the defined type
  let actionData = useActionData<ActionData>();

  return (
    <>
      <Header />
      <div className='flex min-h-full flex-1 flex-col justify-center px-8 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <Form method='post'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  required
                  autoComplete='email'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <br />
            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-semibold text-indigo-600 hover:text-indigo-500'
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  required
                  autoComplete='current-password'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <br />
            {actionData?.error && (
              <p style={{ color: "red" }}>{actionData.error}</p>
            )}
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Login
            </button>
          </Form>
          <p className='mt-10 text-center text-sm text-gray-500'>
            Not a member?{" "}
            <a
              href='/register'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
