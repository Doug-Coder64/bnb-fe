import { ActionFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createUser } from "~/models/user.server";
import Header from "~/components/Header";
// Define the type for action data
interface ActionData {
  error?: string;
}

export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let firstName = formData.get("firstName");
  let lastName = formData.get("lastName");
  let email = formData.get("email");
  let userName = formData.get("userName");
  let password = formData.get("password");

  // Ensure that formData values are strings
  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof userName !== "string" ||
    typeof password !== "string"
  ) {
    return { error: "Invalid form data" };
  }

  try {
    await createUser(firstName, lastName, email, userName, password);
    return redirect("/login");
  } catch (error) {
    console.error(error);
    return { error: "User registration failed" };
  }
};

export default function Register() {
  // Cast actionData to the defined type
  let actionData = useActionData<ActionData>();

  return (
    <div>
      <Header />
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign Up Today!
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <Form method='post'>
            <label className='block text-sm font-medium leading-6 text-gray-900'>
              First Name:{" "}
              <input
                type='text'
                name='firstName'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </label>
            <br />
            <label className='block text-sm font-medium leading-6 text-gray-900'>
              Last Name:{" "}
              <input
                type='text'
                name='lastName'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </label>
            <br />
            <label className='block text-sm font-medium leading-6 text-gray-900'>
              Email:{" "}
              <input
                type='email'
                name='email'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </label>
            <br />
            <label className='block text-sm font-medium leading-6 text-gray-900'>
              Username:{" "}
              <input
                type='text'
                name='userName'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </label>
            <br />
            <label className='block text-sm font-medium leading-6 text-gray-900'>
              Password:{" "}
              <input
                type='password'
                name='password'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </label>
            <br />
            {actionData?.error && (
              <p style={{ color: "red" }}>{actionData.error}</p>
            )}
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Register
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
