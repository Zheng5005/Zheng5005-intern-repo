import { Field, Form, Formik, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { selectCount } from "../store/counterSlice";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function FormikComponent() {
  const count = useSelector(selectCount)

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-xl font-semibold">Sign up</h1>

      <Formik
        initialValues={{
          name: "",
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
          resetForm();
        }}
      >
        <Form className="space-y-4">
          <div>
            <label htmlFor="name">Name</label>
            <Field
              id="name"
              name="name"
              placeholder="John Doe"
              className="block w-full border p-2"
            />
            <ErrorMessage
              name="name"
              component="p"
              className="text-red-600 text-sm"
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="john@acme.com"
              className="block w-full border p-2"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-600 text-sm"
            />
          </div>

          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer"
          >
            Submit
          </button>
        </Form>
      </Formik>

      {count > 20 ? (
        <div className="rounded-md bg-gray-100 p-4">
          <p>count is greater than 20 in this moment, the current count is: {count}</p>
        </div>
      ) : null}
    </div>
  );
}

