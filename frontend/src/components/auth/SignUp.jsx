import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignUp = () => {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // alert(JSON.stringify(values));
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {formik=>(
        <div className='ui container'>
          <div className='ui segment'>
            <Form className='ui form'>
              <div className="field">
                <label htmlFor='firstName'>First Name</label>
                <Field name='firstName' type='text' />
                <ErrorMessage name="firstName" />
              </div>

              <div className="field">
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" type="text" />
                <ErrorMessage name="lastName" />
              </div>

              <div className="field">
                <label htmlFor="email">Email Address</label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" />
              </div>

              <button className='ui primary button' type="submit">Submit</button>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default SignUp;
